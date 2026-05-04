'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  RefreshCw,
  Search,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  MessageSquare,
  User,
  Phone,
  Calendar,
  Stethoscope,
  Filter,
  Inbox,
  ChevronDown,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';

/* ─── Types ─── */
interface Inquiry {
  id: string;
  name: string;
  phone: string;
  department: string;
  doctor: string | null;
  date: string;
  time: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  new: number;
  read: number;
  replied: number;
}

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; border: string; text: string; icon: React.ElementType; label: string }> = {
    new: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: Clock, label: 'New' },
    read: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400', icon: Eye, label: 'Read' },
    replied: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', icon: CheckCircle2, label: 'Replied' },
  };
  const c = config[status] || config.new;
  const Icon = c.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} border ${c.border} ${c.text}`}>
      <Icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}

/* ─── Stat Card ─── */
function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="glass-card p-4 sm:p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${color}/15 border ${color}/20 border flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-white/40 font-medium">{label}</div>
      </div>
    </div>
  );
}

/* ─── Inquiry Detail Modal ─── */
function InquiryModal({ inquiry, onClose, onStatusChange, onDelete }: {
  inquiry: Inquiry;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const deptMap: Record<string, string> = {
    'dept.obstetrics': 'Obstetrics & Maternity',
    'dept.surgery': 'Gynecologic Surgery',
    'dept.fertility': 'Fertility & IVF',
    'dept.oncology': 'Gynecologic Oncology',
    'dept.menopause': 'Menopause Clinic',
    'dept.general': 'General Gynecology',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-card p-6 sm:p-8 max-w-lg w-full relative overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/30 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-6">Inquiry Details</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 flex items-center justify-center">
              <User className="w-5 h-5 text-[#00D4FF]" />
            </div>
            <div>
              <div className="text-white font-semibold">{inquiry.name}</div>
              <div className="text-white/40 text-sm">{inquiry.phone}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass p-3 rounded-xl">
              <div className="text-white/40 text-xs mb-1 flex items-center gap-1">
                <Stethoscope className="w-3 h-3" /> Department
              </div>
              <div className="text-white text-sm font-medium">{deptMap[inquiry.department] || inquiry.department}</div>
            </div>
            <div className="glass p-3 rounded-xl">
              <div className="text-white/40 text-xs mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Date & Time
              </div>
              <div className="text-white text-sm font-medium">{inquiry.date} {inquiry.time || ''}</div>
            </div>
          </div>

          {inquiry.doctor && (
            <div className="glass p-3 rounded-xl">
              <div className="text-white/40 text-xs mb-1">Preferred Doctor</div>
              <div className="text-white text-sm font-medium">{inquiry.doctor}</div>
            </div>
          )}

          {inquiry.message && (
            <div className="glass p-3 rounded-xl">
              <div className="text-white/40 text-xs mb-1 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Message
              </div>
              <div className="text-white/80 text-sm leading-relaxed">{inquiry.message}</div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-white/30 text-xs">
              Submitted: {new Date(inquiry.createdAt).toLocaleString()}
            </div>
            <StatusBadge status={inquiry.status} />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          {inquiry.status !== 'read' && (
            <button
              onClick={() => onStatusChange(inquiry.id, 'read')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Mark Read
            </button>
          )}
          {inquiry.status !== 'replied' && (
            <button
              onClick={() => onStatusChange(inquiry.id, 'replied')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Mark Replied
            </button>
          )}
          <button
            onClick={() => { onDelete(inquiry.id); onClose(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Admin Dashboard
   ────────────────────────────────────────────── */
export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, read: 0, replied: 0 });
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // Verify auth
  useEffect(() => {
    fetch('/api/admin/verify')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin');
        } else {
          setAdminName(data.admin?.name || 'Admin');
        }
      })
      .catch(() => router.push('/admin'));
  }, [router]);

  // Fetch inquiries
  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/inquiries?${params.toString()}`);
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setInquiries(data.inquiries || []);
      setStats(data.stats || { total: 0, new: 0, read: 0, replied: 0 });
    } catch {
      console.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, router]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchInquiries();
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status });
        }
      }
    } catch {
      console.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchInquiries();
      }
    } catch {
      console.error('Failed to delete inquiry');
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const deptMap: Record<string, string> = {
    'dept.obstetrics': 'Obstetrics',
    'dept.surgery': 'Surgery',
    'dept.fertility': 'Fertility',
    'dept.oncology': 'Oncology',
    'dept.menopause': 'Menopause',
    'dept.general': 'General',
  };

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      {/* ── Top Navbar ── */}
      <div className="sticky top-0 z-40 bg-[#0A0E27]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#00D4FF]/30 overflow-hidden">
                <img src="/dr-vijay-ladumor.jpeg" alt="Sparsh" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <span className="text-white font-bold">Sparsh</span>{' '}
                <span className="text-[#00D4FF] font-bold">Admin</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm hidden sm:block">
                Welcome, <span className="text-white/70">{adminName}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-red-400/30 hover:bg-red-500/10 transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Inbox} label="Total Inquiries" value={stats.total} color="bg-[#00D4FF]" />
          <StatCard icon={Clock} label="New" value={stats.new} color="bg-blue-500" />
          <StatCard icon={Eye} label="Read" value={stats.read} color="bg-yellow-500" />
          <StatCard icon={CheckCircle2} label="Replied" value={stats.replied} color="bg-green-500" />
        </div>

        {/* ── Filters Row ── */}
        <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by name, phone, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 focus:border-[#00D4FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/20 transition-all text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="relative w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-44 pl-10 pr-8 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-[#00D4FF]/40 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0D1333]">All Status</option>
              <option value="new" className="bg-[#0D1333]">New</option>
              <option value="read" className="bg-[#0D1333]">Read</option>
              <option value="replied" className="bg-[#0D1333]">Replied</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          </div>

          {/* Refresh */}
          <button
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-medium hover:bg-[#00D4FF]/20 transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* ── Inquiries List ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#00D4FF] animate-spin" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <Inbox className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white/50 mb-2">No Inquiries Found</h3>
            <p className="text-white/30 text-sm">
              {search || statusFilter !== 'all'
                ? 'Try changing your filters or search terms'
                : 'Inquiries from the appointment form will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {inquiries.map((inquiry) => (
                <motion.div
                  key={inquiry.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-4 sm:p-5 hover:border-[#00D4FF]/20 transition-colors duration-300 cursor-pointer"
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Left: Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0066FF]/15 to-[#00D4FF]/15 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-[#00D4FF]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-semibold text-sm truncate">{inquiry.name}</h4>
                          <p className="text-white/40 text-xs flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {inquiry.phone}
                          </p>
                        </div>
                        <StatusBadge status={inquiry.status} />
                      </div>

                      <div className="flex flex-wrap gap-2 ml-12">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-white/50 text-xs">
                          <Stethoscope className="w-3 h-3" />
                          {deptMap[inquiry.department] || inquiry.department}
                        </span>
                        {inquiry.doctor && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-white/50 text-xs">
                            {inquiry.doctor}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] text-white/50 text-xs">
                          <Calendar className="w-3 h-3" />
                          {inquiry.date} {inquiry.time || ''}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions + Time */}
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-3 ml-12 sm:ml-0">
                      <span className="text-white/25 text-xs">
                        {new Date(inquiry.createdAt).toLocaleDateString()} {new Date(inquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedInquiry(inquiry); }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-[#00D4FF]/10 text-white/40 hover:text-[#00D4FF] transition-colors"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(inquiry.id); }}
                          disabled={deletingIds.has(inquiry.id)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {deletingIds.has(inquiry.id) ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Count */}
        {!loading && inquiries.length > 0 && (
          <div className="text-center mt-6 text-white/25 text-xs">
            Showing {inquiries.length} inquiry{inquiries.length !== 1 ? 'ies' : 'y'}
          </div>
        )}
      </div>

      {/* ── Inquiry Detail Modal ── */}
      <AnimatePresence>
        {selectedInquiry && (
          <InquiryModal
            inquiry={selectedInquiry}
            onClose={() => setSelectedInquiry(null)}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
