import { useCallback, useRef, useState } from "react";
import type { ReactElement } from "react";
import {
  UploadCloud,
  File as FileIcon,
  X,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardBody } from "../../components/ui/Card";
import { Select } from "../../components/ui/Select";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { STATES, DISTRICTS_BY_STATE, VILLAGES } from "../../data/mockData";
import { formatFileSize } from "../../utils/format";
import { useToast } from "../../components/ui/Toast";

interface QueueItem {
  id: string;
  name: string;
  sizeKb: number;
  progress: number;
  status: "uploading" | "uploaded" | "processing" | "completed" | "failed";
}

export function DocumentUploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: "q1", name: "khasra_124_2.jpg", sizeKb: 2340, progress: 100, status: "processing" },
    { id: "q2", name: "jamabandi_2030.pdf", sizeKb: 5620, progress: 100, status: "completed" },
    { id: "q3", name: "register_page.jpg", sizeKb: 1180, progress: 62, status: "uploading" },
  ]);
  const [state, setState] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const { push } = useToast();

  const districts = state ? DISTRICTS_BY_STATE[state] ?? [] : [];

  const addFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const items: QueueItem[] = Array.from(files).map((f, i) => ({
      id: `new-${Date.now()}-${i}`,
      name: f.name,
      sizeKb: Math.round(f.size / 1024),
      progress: 0,
      status: "uploading",
    }));
    setQueue((q) => [...items, ...q]);
    items.forEach((item) => {
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 30;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setQueue((q) => q.map((x) => (x.id === item.id ? { ...x, progress: 100, status: "uploaded" } : x)));
          setTimeout(() => {
            setQueue((q) => q.map((x) => (x.id === item.id ? { ...x, status: "processing" } : x)));
          }, 500);
        } else {
          setQueue((q) => q.map((x) => (x.id === item.id ? { ...x, progress: p } : x)));
        }
      }, 250);
    });
    push("info", `${items.length} file(s) added to the upload queue.`);
  }, [push]);

  const removeItem = (id: string) => setQueue((q) => q.filter((x) => x.id !== id));

  const statusMeta: Record<QueueItem["status"], { icon: ReactElement; label: string; color: string }> = {
    uploading: { icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />, label: "Uploading", color: "text-brand-600" },
    uploaded: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Uploaded", color: "text-info-500" },
    processing: { icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />, label: "Processing", color: "text-warning-600" },
    completed: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Completed", color: "text-success-600" },
    failed: { icon: <AlertTriangle className="h-3.5 w-3.5" />, label: "Failed", color: "text-danger-500" },
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Upload Historical Land Records</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Upload scanned documents, handwritten registers, or legacy PDFs for AI-assisted digitization.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <CardBody>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                className={`flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg py-14 px-6 transition-colors ${
                  dragOver ? "border-brand-500 bg-brand-50" : "border-slate-300 bg-slate-50/50"
                }`}
              >
                <div className="h-12 w-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mb-3">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-navy-800">Drag &amp; drop files here, or</p>
                <Button size="sm" className="mt-3" onClick={() => fileInput.current?.click()}>
                  Choose Files
                </Button>
                <input
                  ref={fileInput}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <p className="text-xs text-slate-400 mt-3">Supported formats: PDF, JPG, PNG, TIFF · Max 50MB per file</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Upload Queue" subtitle={`${queue.length} file(s) in this session`} />
            <div className="divide-y divide-slate-100">
              {queue.length === 0 && <p className="text-sm text-slate-400 text-center py-8">No files uploaded yet.</p>}
              {queue.map((item) => {
                const meta = statusMeta[item.status];
                return (
                  <div key={item.id} className="flex items-center gap-3 px-5 py-3.5">
                    <span className="h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                      <FileIcon className="h-4 w-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-navy-800 truncate font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{formatFileSize(item.sizeKb)}</span>
                        {item.status === "uploading" && (
                          <div className="flex-1 h-1 rounded-full bg-slate-100 overflow-hidden max-w-[140px]">
                            <div className="h-full bg-brand-500 transition-all" style={{ width: `${item.progress}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-xs font-medium shrink-0 ${meta.color}`}>
                      {meta.icon}
                      {meta.label}
                    </span>
                    <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-danger-500 shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader title="Upload Options" subtitle="Add metadata to speed up AI extraction" />
          <CardBody className="space-y-4">
            <Select label="Document Type" defaultValue="">
              <option value="" disabled>Select document type</option>
              <option>Khasra</option>
              <option>Khatauni</option>
              <option>Jamabandi</option>
              <option>Record of Rights</option>
              <option>Mutation Register</option>
              <option>Survey Settlement</option>
              <option>Register</option>
            </Select>
            <Select label="State" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select state</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Select label="District" disabled={!state}>
              <option value="">Select district</option>
              {districts.map((d) => <option key={d}>{d}</option>)}
            </Select>
            <Select label="Tehsil">
              <option value="">Select tehsil</option>
              {districts.map((d) => <option key={d}>{d}</option>)}
            </Select>
            <Select label="Village">
              <option value="">Select village</option>
              {VILLAGES.map((v) => <option key={v}>{v}</option>)}
            </Select>
            <Input label="Year (if available)" placeholder="e.g. 1987" />
            <Button className="w-full" onClick={() => push("success", "Metadata applied to queued files.")}>
              Apply to Queue &amp; Upload
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
