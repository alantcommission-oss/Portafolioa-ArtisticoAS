"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";

interface Artwork {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  tags: string[];
  position: number;
}

export default function AdminArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const tagOptions = ["sombra", "color", "cuerpo completo", "sticker", "obsceno"];
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    tags: [] as string[],
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function fetchArtworks() {
    try {
      const res = await fetch("/api/admin/artworks");
      if (res.ok) {
        setArtworks(await res.json());
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArtworks();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ title: "", description: "", imageUrl: "", tags: [] });
    setShowForm(true);
    setError("");
  }

  function openEdit(art: Artwork) {
    setEditing(art);
    setForm({
      title: art.title,
      description: art.description ?? "",
      imageUrl: art.imageUrl,
      tags: art.tags,
    });
    setShowForm(true);
    setError("");
  }

  async function handleUpload(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, imageUrl: data.url });
      }
    } catch { /* ignore */ } finally { setUploading(false); }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      title: form.title,
      description: form.description || null,
      imageUrl: form.imageUrl,
      tags: form.tags,
    };

    try {
      let res: Response;
      if (editing) {
        res = await fetch(`/api/admin/artworks/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/artworks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setShowForm(false);
        setEditing(null);
        fetchArtworks();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Network error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this artwork?")) return;
    try {
      const res = await fetch(`/api/admin/artworks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchArtworks();
      }
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="font-body text-foreground/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl text-accent uppercase tracking-wider">
          Gallery Management
        </h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white font-heading text-sm tracking-wider uppercase transition-all hover:bg-accent/80"
          disabled={artworks.length >= 60}
        >
          <Plus size={16} />
          Add Artwork
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm font-body">
          {error}
        </div>
      )}

      {/* Form dialog */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="bg-[#0f0a14] border border-[#b30089]/40 rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(179,0,137,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg text-accent">
                {editing ? "Edit Artwork" : "New Artwork"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-foreground/60 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-heading text-sm text-foreground/80 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block font-heading text-sm text-foreground/80 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent resize-y"
                />
              </div>
              <div>
                <label className="block font-heading text-sm text-foreground/80 mb-1">
                  Image
                </label>
                <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files)} className="hidden" />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="O pegar URL..."
                    className="flex-1 bg-muted border border-border rounded px-3 py-2 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                    className="px-3 py-2 bg-accent/20 text-accent font-heading text-sm tracking-wider uppercase rounded hover:bg-accent/30 transition-all disabled:opacity-50 flex items-center gap-1">
                    <Upload size={14} /> {uploading ? "..." : "Subir"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-heading text-sm text-foreground/80 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => {
                    const active = form.tags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            tags: active
                              ? form.tags.filter((t) => t !== tag)
                              : [...form.tags, tag],
                          })
                        }
                        className={`px-3 py-1.5 text-xs tracking-wider uppercase font-heading rounded border transition-all ${
                          active
                            ? "bg-accent text-white border-accent"
                            : "bg-transparent text-foreground/60 border-foreground/20 hover:border-accent/50 hover:text-accent"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent text-white font-heading text-sm tracking-wider uppercase transition-all hover:bg-accent/80"
                >
                  {editing ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-border text-foreground/70 font-heading text-sm tracking-wider uppercase transition-all hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Artwork list */}
      {artworks.length === 0 ? (
        <p className="text-center font-body text-foreground/60 py-12">
          No artworks yet. Add your first one!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 font-heading text-sm text-foreground/60 uppercase tracking-wider">
                  Image
                </th>
                <th className="pb-3 font-heading text-sm text-foreground/60 uppercase tracking-wider">
                  Title
                </th>
                <th className="pb-3 font-heading text-sm text-foreground/60 uppercase tracking-wider hidden md:table-cell">
                  Tags
                </th>
                <th className="pb-3 font-heading text-sm text-foreground/60 uppercase tracking-wider">
                  Position
                </th>
                <th className="pb-3 font-heading text-sm text-foreground/60 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((art) => (
                <tr key={art.id} className="border-b border-border/50">
                  <td className="py-3 pr-3">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 font-body text-foreground/90">
                    {art.title}
                  </td>
                  <td className="py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {art.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 font-body text-foreground/60 text-sm">
                    {art.position}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(art)}
                        className="p-1.5 text-foreground/60 hover:text-accent transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 text-foreground/60 hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
