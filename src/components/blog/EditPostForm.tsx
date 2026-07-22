'use client';

import { useState, useRef, useEffect, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { updatePost, deletePost } from '@/services/post-service';
import { useToast } from '@/components/ui/ToastContext';
import { useImageInsertion } from '@/hooks/useImageInsertion';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { useEditPostStore } from '@/store/edit';
import { getCategories } from '@/services/category-service';

import PostFormFields from '@/components/blog/PostFormFields';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MediaGallery from '@/components/blog/MediaGallery';
import PostFormControls from '@/components/blog/PostFormControls';

import { BlogPost, Category, PinnedPostSummary } from '@/types/blog';

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: number | null;
  published: boolean;
  featured: boolean;
  showUpdated: boolean;
}

type UpdateFieldAction<K extends keyof FormState> = {
  type: 'UPDATE_FIELD';
  field: K;
  value: FormState[K];
};

type FormUpdateActions = {
  [K in keyof FormState]: UpdateFieldAction<K>;
}[keyof FormState];

type FormAction =
  FormUpdateActions | { type: 'SET_INITIAL_STATE'; payload: FormState };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_INITIAL_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface EditPostFormProps {
  post: BlogPost;
  categories?: Category[];
  pinnedPost?: PinnedPostSummary | null;
}

export default function EditPostForm({
  post,
  categories: propCategories,
  pinnedPost = null,
}: EditPostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { setCurrentPostPublished } = useEditPostStore();

  const getInitialState = useCallback(
    (initialPost: BlogPost): FormState => ({
      title: initialPost.title || '',
      slug: initialPost.slug || '',
      excerpt: initialPost.excerpt || '',
      content: initialPost.content || '',
      categoryId: initialPost.category_id ?? null,
      published: initialPost.published || false,
      featured: Boolean(initialPost.featured && initialPost.published),
      showUpdated: initialPost.show_updated || false,
    }),
    []
  );

  const initialFormState = getInitialState(post);

  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const {
    title,
    slug,
    excerpt,
    content,
    categoryId,
    published,
    featured,
    showUpdated,
  } = state;

  const [categories, setCategories] = useState<Category[]>(
    propCategories || []
  );
  const [categoriesLoading, setCategoriesLoading] = useState(!propCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (!propCategories && categoriesLoading) {
      const fetchCategoriesOnce = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error('Failed to fetch categories:', err);
        } finally {
          setCategoriesLoading(false);
        }
      };

      fetchCategoriesOnce();
    }
  }, [propCategories, categoriesLoading]);

  useEffect(() => {
    const initialCheckState = getInitialState(post);
    const formChanged =
      state.title !== initialCheckState.title ||
      state.slug !== initialCheckState.slug ||
      state.excerpt !== initialCheckState.excerpt ||
      state.content !== initialCheckState.content ||
      state.categoryId !== initialCheckState.categoryId ||
      state.featured !== initialCheckState.featured ||
      state.published !== initialCheckState.published ||
      state.showUpdated !== initialCheckState.showUpdated;

    setHasUnsavedChanges(formChanged);
  }, [state, post, getInitialState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePost(post.id, {
        ...state,
        category_id: state.categoryId,
        user_id: post.user_id,
      });

      const replacedPinnedPost =
        state.published &&
        state.featured &&
        pinnedPost &&
        pinnedPost.id !== post.id;
      showToast(
        replacedPinnedPost
          ? `Post saved and pinned. “${pinnedPost.title}” was unpinned.`
          : 'Post updated successfully!',
        'success'
      );
      setHasUnsavedChanges(false);
      router.push(`/blog/${state.slug}`);
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      await deletePost(post.id);

      showToast('Post deleted successfully!', 'success');
      setHasUnsavedChanges(false);
      router.push(
        post.published ? '/admin/blog/published' : '/admin/blog/drafts'
      );
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const discardChanges = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  const {
    showUnsavedChangesModal,
    handleConfirmNavigation,
    handleCancelNavigation,
  } = useUnsavedChanges({
    hasUnsavedChanges,
    onDiscard: discardChanges,
  });

  const {
    textareaRef,
    cursorPosition,
    handleTextAreaSelect,
    insertImageAtCursor,
  } = useImageInsertion(
    content,
    (newContent: string) =>
      dispatch({ type: 'UPDATE_FIELD', field: 'content', value: newContent }),
    () => setShowGallery(false)
  );

  useEffect(() => {
    setCurrentPostPublished(post.published || false);
    return () => {
      setCurrentPostPublished(null);
    };
  }, [post.published, setCurrentPostPublished]);

  const createFieldDispatcher = useCallback(
    <K extends keyof FormState>(field: K) =>
      (value: FormState[K]) => {
        dispatch({ type: 'UPDATE_FIELD', field, value } as FormAction);
      },
    []
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="text-dark dark:text-light">
        <PostFormFields
          title={title}
          setTitle={createFieldDispatcher('title')}
          slug={slug}
          setSlug={createFieldDispatcher('slug')}
          excerpt={excerpt}
          setExcerpt={createFieldDispatcher('excerpt')}
          content={content}
          setContent={createFieldDispatcher('content')}
          published={published}
          setPublished={createFieldDispatcher('published')}
          featured={featured}
          setFeatured={createFieldDispatcher('featured')}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          showUpdated={showUpdated}
          setShowUpdated={createFieldDispatcher('showUpdated')}
          textareaRef={textareaRef}
          onTextAreaSelect={handleTextAreaSelect}
          categories={categories}
          categoryId={categoryId}
          setCategoryId={createFieldDispatcher('categoryId')}
          categoriesLoading={categoriesLoading}
          pinnedPost={pinnedPost}
          currentPostId={post.id}
        />
        <PostFormControls
          isSubmitting={isSubmitting}
          hasUnsavedChanges={hasUnsavedChanges}
          isDeleting={isDeleting}
          showDelete={true}
          onDelete={handleDeleteClick}
          onSubmitText="Save Post"
          onDeleteText="Delete"
        />
      </form>

      <Modal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Post'}
        confirmDisabled={isDeleting}
      />

      <Modal
        isOpen={showGallery}
        title="Media Gallery"
        message=""
        onCancel={() => setShowGallery(false)}
        buttons="cancel"
        size="large"
        leftButton={
          <Button
            type="button"
            text="Upload"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          />
        }
      >
        <MediaGallery
          onSelect={insertImageAtCursor}
          fileInputRef={fileInputRef}
          cursorPosition={cursorPosition}
        />
      </Modal>

      <Modal
        isOpen={showUnsavedChangesModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave this page?"
        onCancel={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        confirmText="Leave Page"
      />
    </>
  );
}
