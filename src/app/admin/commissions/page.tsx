"use client";

import { useState, useEffect } from "react";

interface Slot {
  id: string;
  categoryId: string;
  status: string;
  clientName: string | null;
  clientEmail: string | null;
}

interface Category {
  id: string;
  name: string;
  basePrice: number;
  headshotPrice: number | null;
  halfbodyPrice: number | null;
  fullbodyPrice: number | null;
  sortOrder: number;
  slots: Slot[];
}

const STATUS_OPTIONS = ["available", "pending", "completed"];

export default function AdminCommissionsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/commissions");
      if (res.ok) setCategories(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function updateSlot(
    slotId: string,
    data: { status?: string; clientName?: string; clientEmail?: string }
  ) {
    setUpdating(slotId);
    try {
      await fetch(`/api/admin/commissions/${slotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      fetchCategories();
    } catch {
      // ignore
    } finally {
      setUpdating(null);
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
      <h1 className="font-heading text-2xl text-accent mb-8 uppercase tracking-wider">
        Commission Management
      </h1>

      {categories.length === 0 ? (
        <p className="text-center font-body text-foreground/60 py-12">
          No commission categories found.
        </p>
      ) : (
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.id} className="parchment-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading text-xl text-accent">{cat.name}</h2>
                  <p className="text-sm font-body text-foreground/60">
                    Base: ${Number(cat.basePrice).toLocaleString()}
                    {cat.headshotPrice &&
                      ` | Headshot: $${Number(cat.headshotPrice).toLocaleString()}`}
                    {cat.halfbodyPrice &&
                      ` | Halfbody: $${Number(cat.halfbodyPrice).toLocaleString()}`}
                    {cat.fullbodyPrice &&
                      ` | Fullbody: $${Number(cat.fullbodyPrice).toLocaleString()}`}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-2 font-heading text-xs text-foreground/60 uppercase tracking-wider">
                        Slot
                      </th>
                      <th className="pb-2 font-heading text-xs text-foreground/60 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="pb-2 font-heading text-xs text-foreground/60 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="pb-2 font-heading text-xs text-foreground/60 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="pb-2 font-heading text-xs text-foreground/60 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.slots.map((slot, idx) => (
                      <tr key={slot.id} className="border-b border-border/50">
                        <td className="py-3 font-body text-foreground/90">
                          {idx + 1}
                        </td>
                        <td className="py-3">
                          <select
                            value={slot.status}
                            onChange={(e) =>
                              updateSlot(slot.id, { status: e.target.value })
                            }
                            disabled={updating === slot.id}
                            className="bg-muted border border-border rounded px-2 py-1 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 font-body text-foreground/60 text-sm">
                          <input
                            type="text"
                            defaultValue={slot.clientName ?? ""}
                            placeholder="Client name"
                            onBlur={(e) => {
                              if (e.target.value !== (slot.clientName ?? "")) {
                                updateSlot(slot.id, {
                                  clientName: e.target.value || "",
                                });
                              }
                            }}
                            className="w-full bg-transparent border border-transparent focus:border-border rounded px-2 py-1 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </td>
                        <td className="py-3 font-body text-foreground/60 text-sm">
                          <input
                            type="email"
                            defaultValue={slot.clientEmail ?? ""}
                            placeholder="Client email"
                            onBlur={(e) => {
                              if (
                                e.target.value !== (slot.clientEmail ?? "")
                              ) {
                                updateSlot(slot.id, {
                                  clientEmail: e.target.value || "",
                                });
                              }
                            }}
                            className="w-full bg-transparent border border-transparent focus:border-border rounded px-2 py-1 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              slot.status === "available"
                                ? "bg-green-500"
                                : slot.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
