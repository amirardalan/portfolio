'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Category } from '@/types/blog';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/category-service';
import { generateSlug } from '@/utils/generate-slug';
import { useToast } from '@/components/ui/ToastContext';
import Modal from '@/components/ui/Modal';
import IconEdit from '@/components/icons/IconEdit';
import IconDelete from '@/components/icons/IconDelete';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const { showToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const editFormRef = useRef<HTMLDivElement>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      if (!isMounted) return;

      try {
        setLoading(true);
        const data = await getCategories();
        if (isMounted) {
          setCategories(data);
        }
      } catch (err) {
        if (!isMounted) return;

        const errorMessage =
          (err as Error).message || 'Error loading categories';
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [showToast]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        editingId !== null &&
        editFormRef.current &&
        !editFormRef.current.contains(event.target as Node)
      ) {
        setEditingId(null);
      }
    }

    if (editingId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingId]);

  const handleAddCategory = useCallback(async () => {
    if (!editName) return;

    setLoading(true);
    try {
      const slug = generateSlug(editName);
      const newCategory = await createCategory({ name: editName, slug });
      setCategories((prev) => [newCategory, ...prev]);
      setEditingId(null);
      setIsNewCategory(false);
      showToast('Category added successfully', 'success');
    } catch (err) {
      const errorMessage = (err as Error).message || 'Failed to add category';
      showToast(errorMessage, 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [editName, setCategories, setLoading, showToast]);

  const handleUpdateCategory = useCallback(
    async (id: number) => {
      if (!editName) return;

      if (isNewCategory) {
        await handleAddCategory();
        return;
      }

      setLoading(true);
      try {
        const slug = generateSlug(editName);
        const updatedCategory = await updateCategory(id, {
          name: editName,
          slug,
        });
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === id
              ? {
                  ...cat,
                  name: updatedCategory.name,
                  slug: updatedCategory.slug,
                }
              : cat
          )
        );
        setEditingId(null);
        showToast('Category updated successfully', 'success');
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Failed to update category';
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [
      editName,
      setCategories,
      setEditingId,
      setLoading,
      showToast,
      isNewCategory,
      handleAddCategory,
    ]
  );

  const handleDeleteCategory = useCallback(
    async (id: number) => {
      setIsDeleting(true);
      try {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        showToast('Category deleted successfully', 'success');
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Failed to delete category';
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      }
    },
    [
      setCategories,
      setIsDeleting,
      setShowDeleteModal,
      setCategoryToDelete,
      showToast,
    ]
  );

  const startDeleteConfirmation = useCallback(
    (category: Category) => {
      setCategoryToDelete(category);
      setShowDeleteModal(true);
    },
    [setCategoryToDelete, setShowDeleteModal]
  );

  const startEditing = useCallback((category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setIsNewCategory(false);
  }, []);

  const startNewCategory = useCallback(() => {
    const tempId = -1;
    setEditingId(tempId);
    setEditName('');
    setIsNewCategory(true);
  }, []);

  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  }, []);

  const categoriesList = useMemo(() => {
    if (loading && categories.length === 0) {
      return (
        <div className="space-y-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-light dark:bg-dark animate-pulse px-6 py-7"
            >
              <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-3 h-3 w-24 rounded bg-zinc-100 dark:bg-zinc-900" />
            </div>
          ))}
        </div>
      );
    }

    const renderedItems = (
      <ul className="bg-light text-dark dark:bg-dark dark:text-light overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
        {isNewCategory && (
          <li
            key="new-category"
            className="border-b border-zinc-200 bg-zinc-50 p-5 md:p-6 dark:border-zinc-800 dark:bg-zinc-900/70"
          >
            <div
              ref={editFormRef}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-light text-dark focus:border-primary dark:bg-dark dark:text-light h-12 min-w-[180px] flex-grow rounded-xl border border-zinc-300 px-4 text-sm transition-colors outline-none dark:border-zinc-700"
                placeholder="New category name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCategory();
                  if (e.key === 'Escape') {
                    setEditingId(null);
                    setIsNewCategory(false);
                  }
                }}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddCategory()}
                  disabled={!editName.trim()}
                  className="bg-dark text-xxs text-light hover:bg-primary dark:bg-light dark:text-dark min-h-10 rounded-full px-4 tracking-[0.1em] uppercase transition-colors disabled:opacity-40"
                >
                  Add category
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setIsNewCategory(false);
                  }}
                  className="text-xxs min-h-10 rounded-full border border-zinc-300 px-4 tracking-[0.1em] uppercase dark:border-zinc-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </li>
        )}
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
          >
            {editingId === cat.id ? (
              <div
                ref={editFormRef}
                className="flex w-full flex-col gap-3 bg-zinc-50 p-5 sm:flex-row sm:items-center md:p-6 dark:bg-zinc-900/70"
              >
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-light text-dark focus:border-primary dark:bg-dark dark:text-light h-12 min-w-[180px] flex-grow rounded-xl border border-zinc-300 px-4 text-sm transition-colors outline-none dark:border-zinc-700"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateCategory(cat.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateCategory(cat.id)}
                    disabled={!editName.trim()}
                    className="bg-dark text-xxs text-light hover:bg-primary dark:bg-light dark:text-dark min-h-10 rounded-full px-4 tracking-[0.1em] uppercase transition-colors disabled:opacity-40"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-xxs min-h-10 rounded-full border border-zinc-300 px-4 tracking-[0.1em] uppercase dark:border-zinc-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 p-5 transition-colors hover:bg-zinc-50 md:p-6 dark:hover:bg-zinc-900/70">
                <button
                  type="button"
                  className="min-w-0 flex-grow text-left"
                  onClick={() => startEditing(cat)}
                >
                  <span className="block text-lg font-medium">{cat.name}</span>
                  <span className="mt-1 block font-mono text-xs font-normal text-zinc-500 dark:text-zinc-400">
                    /{cat.slug}
                  </span>
                </button>
                <div className="ml-auto flex gap-1">
                  <button
                    onClick={() => startEditing(cat)}
                    className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    title="Edit category"
                    aria-label={`Edit ${cat.name}`}
                  >
                    <IconEdit className="group-hover:text-primary h-5 w-5 text-zinc-400 transition-colors duration-200 dark:text-zinc-600" />
                  </button>
                  <button
                    onClick={() => startDeleteConfirmation(cat)}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Delete category"
                    aria-label={`Delete ${cat.name}`}
                  >
                    <IconDelete className="h-5 w-5 fill-zinc-400 duration-200 hover:fill-red-500 dark:fill-zinc-600" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );

    if (categories.length === 0 && !isNewCategory) {
      return (
        <div className="rounded-3xl border border-dashed border-zinc-300 px-6 py-16 text-center dark:border-zinc-700">
          <p className="text-dark dark:text-light font-serif text-2xl italic">
            No categories yet.
          </p>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Create one to start organizing your writing.
          </p>
        </div>
      );
    }

    return renderedItems;
  }, [
    categories,
    editingId,
    editName,
    loading,
    handleUpdateCategory,
    startEditing,
    startDeleteConfirmation,
    isNewCategory,
    handleAddCategory,
  ]);

  return (
    <section className="pb-10">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xxs tracking-[0.2em] text-zinc-500 uppercase dark:text-zinc-400">
            Category library
          </h2>
          <p className="mt-2 text-sm font-normal text-zinc-500 dark:text-zinc-400">
            {categories.length}{' '}
            {categories.length === 1 ? 'category' : 'categories'}
          </p>
        </div>
        <button
          onClick={startNewCategory}
          className="bg-dark text-light hover:bg-primary dark:bg-light dark:text-dark dark:hover:bg-primary inline-flex min-h-11 items-center justify-center gap-3 self-start rounded-full px-5 text-xs tracking-[0.12em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
          disabled={isNewCategory}
        >
          New category <span aria-hidden="true">+</span>
        </button>
      </div>
      <div>{categoriesList}</div>

      <Modal
        isOpen={showDeleteModal}
        title="Delete category?"
        message={`Deleting "${categoryToDelete?.name}" will leave any posts using it uncategorized. The posts themselves will not be deleted.`}
        onCancel={cancelDelete}
        onConfirm={() =>
          categoryToDelete && handleDeleteCategory(categoryToDelete.id)
        }
        confirmText={isDeleting ? 'Deleting...' : 'Delete Category'}
        confirmDisabled={isDeleting}
      />
    </section>
  );
}
