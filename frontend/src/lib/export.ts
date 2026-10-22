export const exportProfileAsJSON = (profile: any): void => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `vishwasx_profile_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportProgressAsJSON = (progress: any): void => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `vishwasx_progress_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const exportToCSV = (data: any[], filename = "export"): void => {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((obj) => headers.map((header) => JSON.stringify(obj[header] ?? "")).join(","));
  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportRoadmapAsPDF = async (profile: any, roadmap: any[], progress: any): Promise<void> => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>VishwasX Learning Roadmap - ${profile.desiredRole || "Career Restart"}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #1e293b; }
          h1 { color: #0284c7; margin-bottom: 4px; }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
          .card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
          .task { margin: 8px 0; }
          .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; background: #f1f5f9; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>VishwasX Learning Roadmap</h1>
          <p>Role Target: <strong>${profile.desiredRole || "Software Professional"}</strong> | Experience: ${profile.yearsExperience || 0} years</p>
        </div>
        ${roadmap
          .map(
            (m) => `
          <div class="card">
            <h3>Month ${m.month}: ${m.title}</h3>
            <ul>
              ${m.tasks.map((t: string, idx: number) => `<li>${t} ${progress[`${m.month}-${idx}`] ? "<strong>(Completed)</strong>" : ""}</li>`).join("")}
            </ul>
          </div>
        `
          )
          .join("")}
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};

export const exportCareerAnalysisAsPDF = async (profile: any, skillGap: any): Promise<void> => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>VishwasX Career Gap Analysis</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #1e293b; }
          h1 { color: #0284c7; }
          .section { margin-bottom: 20px; }
          .tag { display: inline-block; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 999px; margin: 4px; font-size: 12px; }
          .tag-missing { background: #fee2e2; color: #b91c1c; }
        </style>
      </head>
      <body>
        <h1>VishwasX Career Gap Analysis</h1>
        <div class="section">
          <h3>Your Current Skills</h3>
          <div>${(skillGap.currentSkills || []).map((s: string) => `<span class="tag">${s}</span>`).join("")}</div>
        </div>
        <div class="section">
          <h3>Target Skills to Learn</h3>
          <div>${(skillGap.missingSkills || []).map((s: string) => `<span class="tag tag-missing">${s}</span>`).join("")}</div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
