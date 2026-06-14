// --- CUSTOM NOTIFICATION SYSTEM ---
        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            let bgClass = type === 'success' ? 'bg-cyber-teal text-white' : 'bg-cyber-rose text-white';
            let icon = type === 'success' ? 'check-circle' : 'alert-circle';
            
            toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 ${bgClass}`;
            toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i><span class="text-sm font-semibold tracking-wide">${message}</span>`;
            
            container.appendChild(toast);
            lucide.createIcons();
            
            // Animate in
            setTimeout(() => {
                toast.classList.remove('translate-y-10', 'opacity-0');
            }, 10);
            
            // Animate out
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-4');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        function customConfirm(title, message, onConfirmCallback) {
            const modal = document.getElementById('confirm-modal');
            document.getElementById('confirm-title').innerText = title;
            document.getElementById('confirm-message').innerText = message;
            
            modal.classList.remove('hidden');
            
            document.getElementById('confirm-cancel').onclick = function() {
                modal.classList.add('hidden');
            };
            
            document.getElementById('confirm-ok').onclick = function() {
                modal.classList.add('hidden');
                if (onConfirmCallback) onConfirmCallback();
            };
        }

        // --- LIFEOS LOGIC ---
        let premiumChartInstance = null;
        let ventureChartInstance = null;

        const venturesData = [
            { id: 1, type: 'ai', name: 'Internal Knowledge Base', desc: 'Implement RAG system for company docs.', tier: 'High Priority', cost: 2, potential: 9 },
            { id: 2, type: 'boring', name: 'Vendor Consolidation', desc: 'Audit and consolidate SaaS tools to reduce costs.', tier: 'High Impact', cost: 1, potential: 8 },
            { id: 3, type: 'boring', name: 'Onboarding Revamp', desc: 'Standardize new hire onboarding checklist.', tier: 'Operational', cost: 1, potential: 6 },
            { id: 4, type: 'ai', name: 'Automated Reporting', desc: 'Use AI to generate weekly metric summaries.', tier: 'Strategic', cost: 3, potential: 7 },
            { id: 5, type: 'boring', name: 'Process Documentation', desc: 'Map out core operational workflows.', tier: 'Foundation', cost: 1, potential: 5 },
            { id: 6, type: 'ai', name: 'Customer Support Bot', desc: 'Deploy Tier 1 support chatbot.', tier: 'Experimental', cost: 4, potential: 8 }
        ];

        // --- CAREER COMPASS LOGIC ---
        const quadrantData = {
            stem: {
                icon: "🔬", title: "Technical Skills", color: "text-cyber-indigo", bg: "bg-indigo-950/30", border: "border-indigo-800/30",
                desc: "Software architecture, data analysis, and technical implementation.",
                jobs: ["System Design", "Data Analytics", "Cloud Infra", "API Development"]
            },
            arts: {
                icon: "🎨", title: "Creative & Design", color: "text-cyber-rose", bg: "bg-rose-950/30", border: "border-rose-800/30",
                desc: "User experience, interfaces, writing, and presentation.",
                jobs: ["UX/UI Design", "Copywriting", "Presentation", "Brand Strategy"]
            },
            physical: {
                icon: "🛠️", title: "Operational Execution", color: "text-cyber-amber", bg: "bg-amber-950/30", border: "border-amber-800/30",
                desc: "Project management, process optimization, and day-to-day execution.",
                jobs: ["Project Management", "Process Optimization", "Resource Allocation"]
            },
            policy: {
                icon: "🏛️", title: "Leadership & Strategy", color: "text-cyber-teal", bg: "bg-cyan-950/30", border: "border-cyan-800/30",
                desc: "Vision, team building, stakeholder management, and compliance.",
                jobs: ["Team Leadership", "Strategic Planning", "Stakeholder Mgmt"]
            }
        };

        function showQuadrantInfo(quad) {
            const data = quadrantData[quad];
            const detailPanel = document.getElementById('quadrant-detail');
            if (!detailPanel) return;
            detailPanel.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 16px;">${data.icon}</div>
                <h3 style="font-size: 24px; font-weight: 800; margin-bottom: 12px;" class="${data.color}">${data.title}</h3>
                <p style="color: var(--color-text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">${data.desc}</p>
                <h4 style="font-weight: 700; color: var(--color-text-primary); margin-bottom: 12px; text-transform: uppercase; tracking-wider; font-size: 11px;">Example Archetypes</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${data.jobs.map(job => `<span class="px-3 py-1 ${data.bg} ${data.border} border rounded-full text-xs ${data.color} font-semibold">${job}</span>`).join('')}
                </div>
            `;
        }

        // --- VENTURES MATRIX LOGIC ---
        function renderVenturesList(filter = 'all') {
            const listContainer = document.getElementById('venture-list');
            if (!listContainer) return;
            listContainer.innerHTML = '';
            
            const filtered = filter === 'all' ? venturesData : venturesData.filter(v => v.type === filter);
            
            filtered.forEach(v => {
                const icon = v.type === 'ai' ? '🤖' : '🧽';
                const color = v.type === 'ai' ? 'text-cyber-indigo bg-indigo-950/30 border-indigo-800/30' : 'text-cyber-amber bg-amber-950/30 border-amber-800/30';
                listContainer.innerHTML += `
                    <div class="glass-card" style="padding: 16px; margin-bottom: 8px; border: 1px solid var(--border-color); background: rgba(255,255,255,0.01);">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                            <div style="font-weight: 700; color: var(--color-text-primary); display: flex; align-items: center; gap: 8px;">
                                <span>${icon}</span> ${v.name}
                            </div>
                            <span class="text-xs px-2.5 py-0.5 rounded border font-semibold ${color}">${v.tier}</span>
                        </div>
                        <p style="font-size: 12px; color: var(--color-text-secondary); line-height: 1.5;">${v.desc}</p>
                    </div>
                `;
            });
        }

        function filterVentures(type) {
            renderVenturesList(type);
            ['all', 'ai', 'boring'].forEach(btn => {
                const el = document.getElementById(`venture-btn-${btn}`);
                if (el) {
                    if (btn === type) {
                        el.className = 'px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all bg-cyber-teal border-cyber-teal/30 text-white shadow-sm shadow-cyber-teal/10';
                    } else {
                        el.className = 'px-4 py-1.5 rounded-lg text-xs font-semibold border border-slate-800 text-slate-400 bg-transparent hover:text-white hover:border-slate-700 transition-all';
                    }
                }
            });
        }

        function switchTab(tabId) {
            document.querySelectorAll('.tab-section').forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(tabId + '-tab');
            if (targetSection) targetSection.classList.add('active');

            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            const navBtn = document.getElementById('nav-' + tabId);
            if (navBtn) navBtn.classList.add('active');

            document.getElementById('sidebar').classList.remove('open');

            // Trigger chart resizes if they exist in the new tab to prevent sizing bugs when un-hiding
            if (tabId === 'prof-skills' && premiumChartInstance) premiumChartInstance.resize();
            if (tabId === 'prof-ventures' && ventureChartInstance) ventureChartInstance.resize();
        }

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
        }

        setInterval(() => {
            const timeSpans = document.querySelectorAll('.live-time-display');
            timeSpans.forEach(timeSpan => {
                timeSpan.textContent = new Date().toLocaleTimeString();
            });
        }, 1000);



        function toggleErgonomicsCheck(el) {
            el.classList.toggle('checked');
            
            const parent = el.parentElement;
            if (!parent || !parent.id) return;

            // Mapping for lists to move items between active and completed states
            const listMap = {
                'subscription-active-list': 'subscription-completed-list',
                'subscription-completed-list': 'subscription-active-list',
                'ergonomics-active-list': 'ergonomics-completed-list',
                'ergonomics-completed-list': 'ergonomics-active-list'
            };
            
            const targetId = listMap[parent.id];
            if (targetId) {
                const targetList = document.getElementById(targetId);
                if (targetList) {
                    // Small delay for visual feedback of the checkmark before moving
                    setTimeout(() => {
                        targetList.appendChild(el);
                    }, 200);
                }
            }
        }

        // --- LOCALSTORAGE HELPERS ---
        function lsSave(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
        }
        function lsLoad(key, fallback) {
            try {
                const v = localStorage.getItem(key);
                return v !== null ? JSON.parse(v) : fallback;
            } catch(e) { return fallback; }
        }

        let routineState = lsLoad('lifeos_routines', window.YourLifeOSData && window.YourLifeOSData.habits ? new Array(window.YourLifeOSData.habits.length).fill(false) : []);
        function toggleRoutine(index) {
            routineState[index] = !routineState[index];
            lsSave('lifeos_routines', routineState);
            updateRoutinesUI();
        }
        function resetRoutines() {
            routineState = new Array(window.YourLifeOSData.habits.length).fill(false);
            lsSave('lifeos_routines', routineState);
            updateRoutinesUI();
        }
        function updateRoutinesUI() {
            const items = document.querySelectorAll('#habits-tab .routine-item');
            let completed = 0;
            items.forEach((item, idx) => {
                if (idx < window.YourLifeOSData.habits.length) {
                    if (routineState[idx]) {
                        item.classList.add('checked');
                        completed++;
                    } else {
                        item.classList.remove('checked');
                    }
                }
            });
            const perc = window.YourLifeOSData.habits.length > 0 ? Math.round((completed / window.YourLifeOSData.habits.length) * 100) : 0;
            const percentageText = document.getElementById('habit-percentage-text');
            if (percentageText) percentageText.textContent = `${perc}%`;
            
            const dashHabit = document.getElementById('dash-habit-progress');
            if (dashHabit) dashHabit.textContent = `${perc}%`;
            
            const dashHabitFooter = document.getElementById('dash-habit-footer');
            if (dashHabitFooter) dashHabitFooter.textContent = `${completed} of 4 routines completed`;
            
            const circle = document.getElementById('habit-progress-circle');
            if (circle) circle.style.strokeDashoffset = 326.72 - (perc / 100) * 326.72;
        }

        // --- WA SECURITY AUDIT LOGIC ---
        const securityChecks = [
            { id: 'realtime_prot', phase: 1, phaseName: 'Phase 1: Core Systems', title: 'Real-Time Protection', desc: 'Defends against malware by analyzing file modifications.', reboot: false, canRemediate: true, regPath: 'WMI', regName: 'DisableRealtimeMonitoring', regValue: '0', regType: 'Property', powershell: 'Set-MpPreference -DisableRealtimeMonitoring $false', rollback: 'Set-MpPreference -DisableRealtimeMonitoring $true' },
            { id: 'pua_block_apps', phase: 1, phaseName: 'Phase 1: Core Systems', title: 'PUA App Blocking', desc: 'Stops installation of unwanted bundled apps.', reboot: false, canRemediate: true, regPath: 'WMI', regName: 'PUAProtection', regValue: '1', regType: 'Property', powershell: 'Set-MpPreference -PUAProtection 1', rollback: 'Set-MpPreference -PUAProtection 0' },
            { id: 'memory_integrity', phase: 1, phaseName: 'Phase 1: Core Systems', title: 'Memory Integrity (HVCI)', desc: 'Prevents malicious code execution in kernel.', reboot: true, canRemediate: true, regPath: 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard', regName: 'Enabled', regValue: '1', regType: 'REG_DWORD', powershell: 'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" -Name "Enabled" -Value 1', rollback: 'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\DeviceGuard\\Scenarios\\HypervisorEnforcedCodeIntegrity" -Name "Enabled" -Value 0' },
            { id: 'firewall_enabled', phase: 1, phaseName: 'Phase 1: Core Systems', title: 'Windows Firewall', desc: 'Ensures firewall profile is active across all network types.', reboot: false, canRemediate: true, regPath: 'NetSecurity', regName: 'Enabled', regValue: 'True', regType: 'Profile', powershell: 'Set-NetFirewallProfile -Enabled True', rollback: 'Set-NetFirewallProfile -Enabled False' },
            
            { id: 'ps_transcription', phase: 2, phaseName: 'Phase 2: Auditing & Logging', title: 'PowerShell Transcription', desc: 'Records all CLI command executions. (Audit Only)', reboot: false, canRemediate: false, regPath: 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell', regName: 'EnableTranscripting', regValue: '1', regType: 'REG_DWORD', powershell: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\Transcription" -Name "EnableTranscripting" -Value 1', rollback: 'Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\Transcription" -Name "EnableTranscripting"' },
            { id: 'disable_telemetry', phase: 2, phaseName: 'Phase 2: Auditing & Logging', title: 'Disable Telemetry', desc: 'Blocks transmission of usage statistics. (Audit Only)', reboot: false, canRemediate: false, regPath: 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection', regName: 'AllowTelemetry', regValue: '0', regType: 'REG_DWORD', powershell: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" -Name "AllowTelemetry" -Value 0', rollback: 'Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\DataCollection" -Name "AllowTelemetry"' },
            
            { id: 'microsoft_updates', phase: 3, phaseName: 'Phase 3: Updates', title: 'Microsoft Product Updates', desc: 'Downloads updates for all MS products.', reboot: false, canRemediate: true, regPath: 'HKLM:\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings', regName: 'AllowMUUpdateService', regValue: '1', regType: 'REG_DWORD', powershell: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings" -Name "AllowMUUpdateService" -Value 1', rollback: 'Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings" -Name "AllowMUUpdateService"' },
            
            { id: 'disable_llmnr', phase: 4, phaseName: 'Phase 4: Network Debloat', title: 'Disable LLMNR', desc: 'Prevents credential harvesting via spoofing. (Audit Only)', reboot: false, canRemediate: false, regPath: 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient', regName: 'EnableMulticast', regValue: '0', regType: 'REG_DWORD', powershell: 'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "EnableMulticast" -Value 0', rollback: 'Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\DNSClient" -Name "EnableMulticast"' }
        ];

        let completedMap = {};
        let currentFilter = 'all';

        function updateMetrics() {
            const total = securityChecks.length;
            let completed = 0;
            let rebootPending = 0;
            
            securityChecks.forEach(check => {
                if (completedMap[check.id] === true) completed++;
                else if (completedMap[check.id] === 'reboot_required') rebootPending++;
            });
            
            let percent = Math.round((completed / total) * 100);
            if (isNaN(percent)) percent = 0;
            
            // WA Gauge
            const ring = document.getElementById('compliance-ring');
            if(ring) ring.style.strokeDashoffset = 251.2 - (percent / 100) * 251.2;
            const compPercent = document.getElementById('compliance-percent');
            if (compPercent) compPercent.innerText = `${percent}%`;
            
            const rating = document.getElementById('compliance-rating');
            if (rating) {
                if (percent < 50) {
                    rating.innerText = 'Vulnerable Default'; rating.className = 'text-sm font-extrabold font-outfit mt-1 text-cyber-rose glow-text-rose mb-1';
                } else if (percent < 100) {
                    rating.innerText = 'Hardened Baseline'; rating.className = 'text-sm font-extrabold font-outfit mt-1 text-cyber-teal glow-text-teal mb-1';
                } else {
                    rating.innerText = 'Fully Secure'; rating.className = 'text-sm font-extrabold font-outfit mt-1 text-cyber-emeraldLight glow-text-emerald mb-1';
                }
            }

            // Sync with LifeOS Main Dashboard
            const dashSecScore = document.getElementById('dash-security-score');
            if (dashSecScore) dashSecScore.innerText = `${percent}%`;
            const dashSecText = document.getElementById('dash-security-text');
            if (dashSecText) dashSecText.innerText = `${completed} of ${total} parameters secure`;
            
            const topSecScore = document.getElementById('top-security-score');
            if (topSecScore) topSecScore.innerText = `${percent}%`;
        }

        function renderChecklist() {
            const container = document.getElementById('checklist-container');
            if (!container) return;
            container.innerHTML = '';
            
            const phases = {};
            securityChecks.forEach(check => {
                if (!phases[check.phase]) phases[check.phase] = { name: check.phaseName, items: [] };
                phases[check.phase].items.push(check);
            });
            
            Object.keys(phases).forEach(phaseId => {
                const phase = phases[phaseId];
                const allDone = phase.items.every(t => completedMap[t.id]);
                
                const phaseCard = document.createElement('div');
                phaseCard.className = `glass-panel rounded-2xl p-6 transition-all duration-300 ${allDone ? 'opacity-80' : ''}`;
                
                phaseCard.innerHTML = `
                    <div class="flex justify-between items-center cursor-pointer pb-4 border-b border-slate-800/60" onclick="document.getElementById('phase-body-${phaseId}').classList.toggle('hidden')">
                        <div class="flex items-center gap-3">
                            <span class="font-outfit font-extrabold text-lg text-white">${phase.name}</span>
                            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${allDone ? 'bg-cyber-emerald/10 text-cyber-emeraldLight' : 'bg-cyber-teal/10 text-cyber-tealLight'}">
                                ${phase.items.filter(t => completedMap[t.id]).length}/${phase.items.length} Secure
                            </span>
                        </div>
                    </div>
                    <div id="phase-body-${phaseId}" class="mt-4 space-y-3"></div>
                `;
                container.appendChild(phaseCard);
                
                const body = document.getElementById(`phase-body-${phaseId}`);
                phase.items.forEach(check => {
                    const isSecure = completedMap[check.id] === true;
                    const canRemediate = check.canRemediate !== false;
                    
                    const itemDiv = document.createElement('div');
                    itemDiv.id = `check-row-${check.id}`;
                    itemDiv.className = `p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-start gap-4 justify-between ${isSecure ? 'border-cyber-emerald/20 bg-cyber-emerald/5' : 'border-slate-800 bg-slate-900/30'}`;
                    
                    itemDiv.innerHTML = `
                        <div class="flex items-start gap-3.5 flex-1">
                            <input type="checkbox" ${isSecure ? 'checked' : ''} onchange="toggleCheck('${check.id}')" class="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900 text-cyber-teal focus:ring-0 cursor-pointer">
                            <div>
                                <div class="flex items-center gap-2">
                                    <div class="font-outfit font-semibold text-slate-200">${check.title}</div>
                                    <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${canRemediate ? 'bg-cyber-teal/10 text-cyber-teal border border-cyber-teal/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}">
                                        ${canRemediate ? 'Remediable' : 'Audit Only'}
                                    </span>
                                </div>
                                <p class="text-slate-400 text-xs mt-1 max-w-2xl">${check.desc}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-end">
                            <button onclick="document.getElementById('details-${check.id}').classList.toggle('hidden')" class="text-xs font-semibold text-slate-500 hover:text-cyber-teal border border-slate-800 px-3 py-1.5 rounded-lg transition-colors">Details</button>
                        </div>
                        <div id="details-${check.id}" class="hidden w-full border-t border-slate-800 mt-4 pt-4 md:col-span-2 text-xs font-mono text-slate-400 bg-slate-950 p-4 rounded-xl">
                            <div class="mb-2"><strong class="text-slate-500">Reg Path:</strong> ${check.regPath}</div>
                            <div class="mb-4"><strong class="text-slate-500">Key:</strong> ${check.regName}</div>
                            <div class="bg-slate-900 p-2 rounded border border-slate-800 text-cyber-tealLight break-all cursor-pointer hover:bg-slate-800 transition" onclick="copyText('${check.powershell.replace(/'/g, "\\'")}')" title="Click to copy">
                                ${check.powershell}
                            </div>
                        </div>
                    `;
                    body.appendChild(itemDiv);
                });
            });
            lucide.createIcons();
            filterControls();
        }

        function toggleCheck(checkId) {
            completedMap[checkId] = !completedMap[checkId];
            lsSave('lifeos_security_audit', completedMap);
            updateMetrics();
            renderChecklist();
        }

        function resetProgress() {
            customConfirm('Reset Security Audit', 'This will wipe your current compliance checklist. Continue?', () => {
                completedMap = {};
                lsSave('lifeos_security_audit', completedMap);
                updateMetrics();
                renderChecklist();
                showToast('Audit state reset.', 'success');
            });
        }

        function copyText(txt) {
            navigator.clipboard.writeText(txt).then(() => showToast('Copied to clipboard!'));
        }

        function copyWinAutoCore() {
            const cmd = document.getElementById('winauto-core-cmd');
            cmd.select();
            cmd.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(cmd.value).then(() => {
                showToast("WinAuto Core command copied!");
            });
        }

        function setFilter(type) {
            currentFilter = type;
            ['all', 'compliant', 'pending'].forEach(btn => {
                const el = document.getElementById(`filter-btn-${btn}`);
                if (el) {
                    el.className = btn === type ? 'px-3.5 py-1.5 rounded-lg text-xs font-semibold border bg-cyber-teal border-cyber-teal/30 text-white' : 'px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-800 text-slate-400 bg-transparent hover:text-white transition-all';
                }
            });
            filterControls();
        }

        function filterControls() {
            const searchInput = document.getElementById('search-input');
            if (!searchInput) return;
            const query = searchInput.value.toLowerCase();
            securityChecks.forEach(check => {
                const row = document.getElementById(`check-row-${check.id}`);
                if (!row) return;
                const isCompleted = completedMap[check.id] || false;
                let matchesSearch = check.title.toLowerCase().includes(query);
                let matchesFilter = currentFilter === 'all' || (currentFilter === 'compliant' && isCompleted) || (currentFilter === 'pending' && !isCompleted);
                
                if (matchesSearch && matchesFilter) row.classList.remove('hidden');
                else row.classList.add('hidden');
            });
        }

        // Script Modal Logic
        let scriptMode = 'hardening';
        let selectedRemediation = {};

        function generateScript() {
            setScriptMode('hardening');
            document.getElementById('script-modal').classList.remove('hidden');
        }
        function closeModal() {
            document.getElementById('script-modal').classList.add('hidden');
        }

        function setScriptMode(mode) {
            scriptMode = mode;
            const tabHardening = document.getElementById('tab-hardening');
            const tabRollback = document.getElementById('tab-rollback');
            if (tabHardening) tabHardening.className = mode === 'hardening' ? 'px-4 py-2 rounded-xl text-xs font-semibold border bg-cyber-teal/20 border-cyber-teal text-white shadow-lg glow-button flex items-center gap-2' : 'px-4 py-2 rounded-xl text-xs font-semibold border border-slate-800 text-slate-400 bg-transparent flex items-center gap-2';
            if (tabRollback) tabRollback.className = mode === 'rollback' ? 'px-4 py-2 rounded-xl text-xs font-semibold border bg-cyber-teal/20 border-cyber-teal text-white shadow-lg flex items-center gap-2' : 'px-4 py-2 rounded-xl text-xs font-semibold border border-slate-800 text-slate-400 bg-transparent flex items-center gap-2';
            
            securityChecks.forEach(check => {
                const isCompliant = completedMap[check.id] === true;
                selectedRemediation[check.id] = mode === 'hardening' ? !isCompliant : isCompliant;
            });
            renderRemediationCheckboxes();
        }

        function renderRemediationCheckboxes() {
            const container = document.getElementById('remediation-selection-list');
            if (!container) return;
            container.innerHTML = '';
            securityChecks.forEach(check => {
                const isSelected = !!selectedRemediation[check.id];
                const item = document.createElement('label');
                item.className = `flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-slate-900 border ${isSelected ? 'bg-cyber-teal/5 border-cyber-teal/20 text-slate-200' : 'border-transparent text-slate-400'}`;
                item.innerHTML = `
                    <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleRemediation('${check.id}', this.checked)" class="rounded border-slate-800 bg-slate-950 text-cyber-teal">
                    <span class="text-[10px] font-bold truncate">${check.title}</span>
                `;
                container.appendChild(item);
            });
            buildScriptText();
        }

        function toggleRemediation(id, checked) {
            selectedRemediation[id] = checked;
            buildScriptText();
        }

        function toggleAllRemediation(state) {
            securityChecks.forEach(check => selectedRemediation[check.id] = state);
            renderRemediationCheckboxes();
        }

        function buildScriptText() {
            const pre = document.getElementById('generated-script-box');
            if (!pre) return;
            let text = `# WA Tailored ${scriptMode === 'hardening' ? 'Hardening' : 'Rollback'} Script\n`;
            text += `# Optimized for WinAuto v2.1.0 (SmartRUN Orchestration)\n\n`;
            
            securityChecks.filter(c => selectedRemediation[c.id]).forEach(c => {
                if (c.canRemediate === false) {
                    text += `# [AUDIT ONLY] ${c.title}\n# Note: This parameter is monitored by the WA scanner but requires manual or core.ps1 remediation.\n`;
                } else {
                    text += `# ${c.title}\n`;
                }
                text += `${scriptMode === 'hardening' ? c.powershell : c.rollback}\n\n`;
            });
            pre.innerText = text;
        }

        function copyGeneratedScript() {
            const box = document.getElementById('generated-script-box');
            if (box) copyText(box.innerText);
        }

        // Scan Modal Logic
        function openScanModal() { 
            let url = 'https://www.aiit.support/progress/posture/Audit-System.ps1';
            if (window.location.origin && window.location.origin.startsWith('http')) {
                url = window.location.origin + '/progress/posture/Audit-System.ps1';
            }
            const cmd = `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; iex (irm "${url}")`;
            
            const cmdInput = document.getElementById('scanner-command-input');
            if (cmdInput) cmdInput.value = cmd;
            
            const sm = document.getElementById('scan-modal');
            if (sm) sm.classList.remove('hidden'); 
            if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
        }
        function closeScanModal() { 
            const sm = document.getElementById('scan-modal');
            if (sm) sm.classList.add('hidden'); 
        }

        function copyScannerCommand() {
            const input = document.getElementById('scanner-command-input');
            if (input) {
                input.select();
                navigator.clipboard.writeText(input.value).then(() => {
                    showToast("Scanner command copied to clipboard!");
                });
            }
        }

        function applyPastedJson() {
            const val = document.getElementById('json-paste-input').value.trim();
            if (!val) {
                showToast("Please paste some JSON data first.", "error");
                return;
            }
            try {
                const data = JSON.parse(val);
                applyScanData(data);
            } catch (err) {
                showToast('Invalid JSON format.', 'error');
            }
        }

        function applyScanData(data) {
            if (typeof data !== 'object' || data === null) {
                showToast("Invalid scan data format.", "error");
                return;
            }
            let count = 0;
            securityChecks.forEach(c => {
                if (data.hasOwnProperty(c.id)) {
                    completedMap[c.id] = !!data[c.id];
                    count++;
                }
            });
            updateMetrics();
            renderChecklist();
            closeScanModal();
            showToast(`Imported ${count} checks successfully!`);
        }

        function initScanImporter() {
            const dropzone = document.getElementById('dropzone');
            const fileInput = document.getElementById('file-input');
            if (!dropzone || !fileInput) return;

            dropzone.addEventListener('click', () => fileInput.click());

            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('border-cyber-teal');
            });

            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('border-cyber-teal');
            });

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('border-cyber-teal');
                if (e.dataTransfer.files.length > 0) {
                    handleFile(e.dataTransfer.files[0]);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleFile(e.target.files[0]);
                }
            });

            function handleFile(file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        applyScanData(data);
                    } catch (err) {
                        showToast("Error parsing JSON file.", "error");
                    }
                };
                reader.readAsText(file);
            }
        }

        // --- JOB LINKS EDITING LOGIC ---
        function initJobLinkEditors() {
            const projectCards = document.querySelectorAll('#dashboard-tab .glass-card');
            
            projectCards.forEach((card, index) => {
                const titleSpan = card.querySelector('span[style*="font-weight:700"], span[style*="font-weight: 700"]');
                if (!titleSpan) return;
                
                const rawId = titleSpan.textContent.split('—')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                const jobId = rawId || `job-${index}`;
                card.id = `job-card-${jobId}`;
                
                let linkContainer = Array.from(card.querySelectorAll('div')).find(div => div.style.borderTop && div.style.borderTop.includes('dashed'));
                
                if (!linkContainer) {
                    linkContainer = document.createElement('div');
                    linkContainer.style.cssText = "margin-top: 4px; font-size: 10px; display: flex; gap: 8px; border-top: 1px dashed rgba(255,255,255,0.05); padding-top: 4px; align-items: center;";
                    card.appendChild(linkContainer);
                } else {
                    linkContainer.style.alignItems = "center";
                }
                
                linkContainer.id = `job-links-${jobId}`;
                
                // Clean up any hijacked summary edit buttons from previous mistake
                const oldSumBtn = linkContainer.querySelector('.edit-summary-btn');
                if (oldSumBtn) oldSumBtn.remove();
                
                // Add the correct job opening edit button
                if (!linkContainer.querySelector('.edit-job-btn')) {
                    const btn = document.createElement('button');
                    btn.className = 'edit-job-btn';
                    btn.title = 'Edit Job Link';
                    btn.innerHTML = '<i data-lucide="edit-2" class="w-3 h-3"></i>';
                    btn.style.cssText = "background:none; border:none; color:var(--color-text-muted); cursor:pointer; padding:0; transition:color 0.2s;";
                    btn.onmouseover = () => btn.style.color = "var(--accent-cyan)";
                    btn.onmouseout = () => btn.style.color = "var(--color-text-muted)";
                    btn.onclick = () => editJobLink(jobId);
                    linkContainer.appendChild(btn);
                }
                
                // Ensure the Summary link is restored if it was overwritten
                const summaryLink = Array.from(linkContainer.querySelectorAll('a')).find(a => a.textContent.includes('Summary') || a.textContent.includes('Job Opening'));
                if (summaryLink && summaryLink.id !== `careers-link-${jobId}`) {
                    summaryLink.textContent = "📄 Summary";
                }
            });
            
            loadJobLinks();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function renderJobLink(jobId, url) {
            const container = document.getElementById(`job-links-${jobId}`);
            if (!container) return;
            
            const oldLink = document.getElementById(`careers-link-${jobId}`);
            if (oldLink) oldLink.remove();
            
            // Clean up any old naming
            Array.from(container.querySelectorAll('a')).forEach(a => {
                if ((a.textContent.includes('Careers') || a.textContent.includes('Link to job') || a.textContent.includes('Job opening')) && !a.id) a.remove();
            });
            
            if (url) {
                const a = document.createElement('a');
                a.id = `careers-link-${jobId}`;
                a.href = url;
                a.target = '_blank';
                a.style.cssText = "color: var(--accent-cyan); text-decoration: none; display: flex; align-items: center; gap: 4px;";
                a.innerHTML = '🌐 Project Link <i data-lucide="external-link" class="w-3 h-3"></i>';
                
                // Find edit button to place link before it
                const editBtn = container.querySelector('.edit-job-btn');
                if (editBtn) {
                    container.insertBefore(a, editBtn);
                    editBtn.style.marginLeft = "4px"; // Tighten spacing
                } else {
                    container.appendChild(a);
                }
                
                // Re-initialize icons for the new link
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        }

        function loadJobLinks() {
            const savedLinks = lsLoad('lifeos_job_links', { 'floqast': 'https://floqast.com/careers', 'gurucul': 'https://gurucul.com/company/careers' });
            Object.keys(savedLinks).forEach(jobId => renderJobLink(jobId, savedLinks[jobId]));
        }

        // --- PRIORITY SPOTLIGHT CLONING LOGIC ---
        function updatePrioritySpotlight(jobId = 'gurucul') {
            const spotlightContainer = document.getElementById('job-spotlight-container');
            if (!spotlightContainer) return;

            const targetCard = document.getElementById(`job-card-${jobId}`);
            if (!targetCard) return;

            // Clone the card
            const clone = targetCard.cloneNode(true);
            clone.id = 'priority-spotlight-clone';

            // Enhance styling for spotlight
            clone.style.marginBottom = "4px";
            clone.style.padding = "12px 18px";
            clone.style.borderRadius = "12px";
            clone.style.background = "rgba(6, 182, 212, 0.05)"; // Use cyan glow
            clone.style.borderLeft = "4px solid var(--accent-cyan)";
            clone.style.borderTop = "none";
            clone.style.transform = "none"; // Remove hover lift for spotlight

            // Add 'Priority Application' prefix to the title
            const titleSpan = clone.querySelector('span[style*="font-weight:700"]');
            if (titleSpan) {
                titleSpan.innerHTML = `<span style="font-size:18px; margin-right:8px;">💼</span> Priority Application: ${titleSpan.textContent}`;
            }

            // Ensure cloned dropdown works and syncs back (simplified)
            const cloneSelect = clone.querySelector('.status-select');
            if (cloneSelect) {
                cloneSelect.onchange = function() {
                    const originalSelect = targetCard.querySelector('.status-select');
                    if (originalSelect) {
                        originalSelect.value = this.value;
                        originalSelect.dispatchEvent(new Event('change'));
                    }
                };
            }
            
            // Re-bind edit button in clone
            const cloneEditBtn = clone.querySelector('.edit-job-btn');
            if (cloneEditBtn) {
                cloneEditBtn.onclick = () => editJobLink(jobId);
            }

            // Sync links (Lucide icons need re-creation on clone)
            spotlightContainer.innerHTML = '';
            spotlightContainer.appendChild(clone);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // --- JOB STATUS WORKFLOW LOGIC ---
        function initJobStatusHandlers() {
            const savedStatuses = lsLoad('lifeos_job_statuses', { 'gurucul': { status: 'submitted', reason: '' } });
            const projectCards = document.querySelectorAll('#dashboard-tab .glass-card');
            
            projectCards.forEach((card, index) => {
                const titleSpan = card.querySelector('span[style*="font-weight:700"]');
                if (!titleSpan) return;
                
                const rawId = titleSpan.textContent.split('—')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
                const jobId = rawId || `job-${index}`;
                const select = card.querySelector('.status-select');
                if (!select) return;

                // Load saved state
                if (savedStatuses[jobId]) {
                    const state = savedStatuses[jobId];
                    select.value = state.status;
                    if (state.status === 'skipped') {
                        const skippedList = document.getElementById('skipped-jobs-list');
                        if (skippedList) skippedList.appendChild(card);
                        card.style.borderLeft = "3px solid var(--color-text-muted)";
                        card.style.background = "rgba(255,255,255,0.01)";
                        const subTextDiv = card.querySelectorAll(':scope > div')[1];
                        if (subTextDiv) {
                            const span1 = subTextDiv.querySelector('span:first-child');
                            if (span1) span1.textContent = `Reason: ${state.reason || 'N/A'}`;
                            subTextDiv.style.color = "var(--color-text-muted)";
                        }
                        if(titleSpan) titleSpan.style.color = "var(--color-text-muted)";
                    }
                }

                // Store previous value to revert if prompt is cancelled
                select.addEventListener('focus', function() {
                    this.dataset.prevValue = this.value;
                });
                
                select.addEventListener('change', function() {
                    const status = this.value;
                    let reason = '';
                    
                    if (status === 'skipped') {
                        reason = prompt("Reason for skipping this job application:");
                        if (reason !== null) {
                            const skippedList = document.getElementById('skipped-jobs-list');
                            if (skippedList) skippedList.appendChild(card);
                            card.style.borderLeft = "3px solid var(--color-text-muted)";
                            card.style.background = "rgba(255,255,255,0.01)";
                            const subTextDiv = card.querySelectorAll(':scope > div')[1];
                            if (subTextDiv) {
                                const span1 = subTextDiv.querySelector('span:first-child');
                                if (span1) span1.textContent = `Reason: ${reason || 'N/A'}`;
                                subTextDiv.style.color = "var(--color-text-muted)";
                            }
                            if(titleSpan) titleSpan.style.color = "var(--color-text-muted)";
                        } else {
                            this.value = this.dataset.prevValue || 'open';
                            return;
                        }
                    }
                    
                    // Save the new state
                    const currentStatuses = lsLoad('lifeos_job_statuses', { 'gurucul': { status: 'submitted', reason: '' } });
                    currentStatuses[jobId] = { status, reason: status === 'skipped' ? reason : '' };
                    lsSave('lifeos_job_statuses', currentStatuses);
                    this.dataset.prevValue = status;
                });
            });
        }

        // Initialization
        window.addEventListener('DOMContentLoaded', () => {
            renderProjects();
            renderEvents();
            renderHabits();

            initJobLinkEditors();
            initJobStatusHandlers();
            // updatePrioritySpotlight(); // Removed: DataSync is now in Submitted Applications

            // --- Restore persisted Last Updated timestamp ---
            const lastUpdatedEl = document.getElementById('last-updated-label');
            if (lastUpdatedEl) {
                const stored = lsLoad('lifeos_last_updated', null);
                lastUpdatedEl.textContent = stored || 'Jun 7, 2026';
            }
            // Store current session date as last updated
            const now = new Date();
            const fmt = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            lsSave('lifeos_last_updated', fmt);
            if (lastUpdatedEl) lastUpdatedEl.textContent = fmt;

            // --- Restore persisted security audit state ---
            completedMap = lsLoad('lifeos_security_audit', {});
            updateMetrics();
            renderChecklist();
            initScanImporter();

            // --- Initialize Professional OS Components ---
            renderVenturesList('all');

            // --- Premium Chart (Bar) ---
            const ctxPremium = document.getElementById('premiumChart');
            if (ctxPremium) {
                premiumChartInstance = new Chart(ctxPremium.getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: ["Bachelor's Degree", 'AI Skills Acquisition'],
                        datasets: [{
                            label: 'Wage Premium %',
                            data: [8, 23],
                            backgroundColor: [
                                'rgba(156, 163, 175, 0.25)', // gray-400 equivalent translucent
                                'rgba(6, 182, 212, 0.4)'    // cyber-teal equivalent translucent
                            ],
                            borderColor: [
                                'rgb(156, 163, 175)',
                                'rgb(6, 182, 212)'
                            ],
                            borderWidth: 1.5,
                            borderRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: { label: (ctx) => `+${ctx.raw}% Wage Premium` }
                            }
                        },
                        scales: {
                            x: { 
                                beginAtZero: true, 
                                max: 30,
                                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                                ticks: { color: '#9CA3AF', font: { family: 'JetBrains Mono', size: 10 } },
                                title: { display: true, text: 'Percentage Increase in Wage', color: '#6B7280', font: { family: 'Plus Jakarta Sans', size: 11 } }
                            },
                            y: {
                                grid: { display: false },
                                ticks: { color: '#F9FAFB', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } }
                            }
                        }
                    }
                });
            }

            // --- Venture Scatter Chart ---
            const ctxVenture = document.getElementById('ventureChart');
            if (ctxVenture) {
                const aiPoints = venturesData.filter(v => v.type === 'ai').map(v => ({ x: v.cost, y: v.potential, r: 8, raw: v }));
                const boringPoints = venturesData.filter(v => v.type === 'boring').map(v => ({ x: v.cost, y: v.potential, r: 8, raw: v }));

                ventureChartInstance = new Chart(ctxVenture.getContext('2d'), {
                    type: 'bubble',
                    data: {
                        datasets: [
                            {
                                label: 'AI Ventures',
                                data: aiPoints,
                                backgroundColor: 'rgba(99, 102, 241, 0.4)', // indigo
                                borderColor: 'rgb(99, 102, 241)',
                                hoverBackgroundColor: 'rgba(99, 102, 241, 0.7)'
                            },
                            {
                                label: 'Boring Businesses',
                                data: boringPoints,
                                backgroundColor: 'rgba(245, 158, 11, 0.4)', // amber
                                borderColor: 'rgb(245, 158, 11)',
                                hoverBackgroundColor: 'rgba(245, 158, 11, 0.7)'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#9CA3AF', font: { family: 'Plus Jakarta Sans', size: 11 } }
                            },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => {
                                        const dataPoint = ctx.raw.raw;
                                        return `${dataPoint.name} (${dataPoint.tier}): ${dataPoint.desc}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                title: { display: true, text: 'Barrier to Entry (1=Low, 5=High)', color: '#6B7280', font: { family: 'Plus Jakarta Sans', size: 11 } },
                                min: 0, max: 5,
                                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                                ticks: { color: '#9CA3AF', stepSize: 1, font: { family: 'JetBrains Mono', size: 10 } }
                            },
                            y: {
                                title: { display: true, text: 'Scale & Cashflow Potential (1-10)', color: '#6B7280', font: { family: 'Plus Jakarta Sans', size: 11 } },
                                min: 0, max: 10,
                                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                                ticks: { color: '#9CA3AF', stepSize: 2, font: { family: 'JetBrains Mono', size: 10 } }
                            }
                        }
                    }
                });
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
            // Update habit UI with persisted state
            updateRoutinesUI();
        });

        

        // ===== THEME TOGGLE =====
        function toggleTheme() {
            const isLight = document.body.classList.toggle('light-mode');
            lsSave('lifeos_theme', isLight ? 'light' : 'dark');
            updateThemeUI(isLight);
        }

        function updateThemeUI(isLight) {
            const icon     = document.getElementById('theme-icon');
            const label    = document.getElementById('theme-label');
            const mIcon    = document.getElementById('mobile-theme-icon');

            if (isLight) {
                if (icon)  { icon.setAttribute('data-lucide', 'moon'); }
                if (mIcon) { mIcon.setAttribute('data-lucide', 'moon'); }
                if (label) label.textContent = 'Dark Mode';
            } else {
                if (icon)  { icon.setAttribute('data-lucide', 'sun'); }
                if (mIcon) { mIcon.setAttribute('data-lucide', 'sun'); }
                if (label) label.textContent = 'Light Mode';
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Apply saved theme on load
        (function initTheme() {
            const saved = lsLoad('lifeos_theme', 'dark');
            if (saved === 'light') {
                document.body.classList.add('light-mode');
                // Icons aren't ready yet — updateThemeUI runs after lucide loads
                document.addEventListener('DOMContentLoaded', () => updateThemeUI(true));
            }
        })();

        // ===== JOB LINK EDITOR =====
        function editJobLink(jobId) {
            const modal = document.getElementById('job-link-modal');
            const input = document.getElementById('job-link-input');
            const title = document.getElementById('job-link-modal-title');
            if (!modal || !input) return;

            // Pre-fill with existing URL if saved
            const savedLinks = lsLoad('lifeos_job_links', {});
            input.value = savedLinks[jobId] || '';

            // Pretty-print the job name in the modal title
            const card = document.getElementById(`job-card-${jobId}`);
            const spanEl = card ? card.querySelector('span[style*="font-weight"]') : null;
            const jobName = spanEl ? spanEl.textContent.trim() : jobId;
            if (title) title.textContent = `Edit link for: ${jobName}`;

            modal.dataset.jobId = jobId;
            modal.style.display = 'flex';
            setTimeout(() => input.focus(), 50);
        }

        function saveJobLink() {
            const modal = document.getElementById('job-link-modal');
            const input = document.getElementById('job-link-input');
            const jobId = modal.dataset.jobId;
            if (!jobId) return;

            const url = input.value.trim();
            const savedLinks = lsLoad('lifeos_job_links', {});

            if (url) {
                savedLinks[jobId] = url;
            } else {
                delete savedLinks[jobId];
            }

            lsSave('lifeos_job_links', savedLinks);
            renderJobLink(jobId, url);
            modal.style.display = 'none';
            showToast('Job link updated!', 'success');
        }

        function closeJobLinkModal() {
            const modal = document.getElementById('job-link-modal');
            modal.style.display = 'none';
        }

// --- DATA-DRIVEN UI RENDERING ---

function renderEvents() {
    if (!window.YourLifeOSData || !window.YourLifeOSData.events) return;
    const container = document.getElementById('events-container');
    if (!container) return;
    container.innerHTML = '';
    
    window.YourLifeOSData.events.forEach(evt => {
        let borderClass = evt.status === 'upcoming' ? 'border-left:3px solid var(--accent-cyan);' : 'border-left:3px solid var(--color-text-muted);';
        let bgClass = evt.status === 'upcoming' ? 'background: linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, transparent 100%);' : 'background: rgba(255,255,255,0.01);';
        let badgeColor = evt.status === 'upcoming' ? 'color:var(--accent-cyan);' : 'color:var(--color-text-muted);';
        
        let detailsHtml = '';
        if(evt.date) detailsHtml += `<strong>Date:</strong> ${evt.date}<br>`;
        if(evt.time) detailsHtml += `<strong>Time:</strong> ${evt.time}<br>`;
        if(evt.location) detailsHtml += `<strong>Location:</strong> ${evt.location}<br>`;
        
        const card = `
        <div class="glass-panel" style="padding: 16px; ${borderClass} ${bgClass}">
            <span style="font-size:9px; font-weight:700; ${badgeColor} text-transform:uppercase; letter-spacing:0.08em;">${evt.status}</span>
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:700; margin-top:2px;">${evt.name}</h3>
            <div style="font-size:12px; color:var(--color-text-secondary); margin-top:6px; line-height:1.4;">
                ${detailsHtml}
            </div>
            ${evt.url ? `<a href="${evt.url}" target="_blank" class="action-button primary" style="margin-top: 10px; padding: 6px 12px; font-size: 11px; height: 32px;">View Event &rarr;</a>` : ''}
        </div>`;
        container.innerHTML += card;
    });
}

function renderHabits() {
    if (!window.YourLifeOSData || !window.YourLifeOSData.habits) return;
    const container = document.getElementById('routines-container');
    if (!container) return;
    container.innerHTML = '';
    
    window.YourLifeOSData.habits.forEach((habit, idx) => {
        const item = `
        <div class="routine-item" onclick="toggleRoutine(${idx})">
            <div class="checkbox-container"></div>
            <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 14px; font-weight: 600;">${habit.name}</span>
                <span style="font-size: 11px; color: var(--color-text-secondary);">${habit.category}</span>
            </div>
        </div>`;
        container.innerHTML += item;
    });
    // Need to initialize the state if it was empty
    if(routineState.length === 0 && window.YourLifeOSData.habits.length > 0) {
        routineState = new Array(window.YourLifeOSData.habits.length).fill(false);
    }
}

function renderProjects() {
    if (!window.YourLifeOSData || !window.YourLifeOSData.projects) return;
    
    const containers = {
        'priority': document.getElementById('priority-job-container'),
        'open': document.getElementById('open-jobs-container'),
        'submitted': document.getElementById('submitted-jobs-container'),
        'secondary': document.getElementById('secondary-jobs-container'),
        'backup': document.getElementById('backup-jobs-container'),
        'closed': document.getElementById('closed-jobs-container')
    };

    // Clear existing content
    Object.values(containers).forEach(c => { if(c) c.innerHTML = ''; });

    window.YourLifeOSData.projects.forEach(job => {
        let borderClass = '';
        let bgClass = '';
        
        // Match original styling based on category
        if(project.category === 'open' || project.category === 'backup' || project.priority === 'high') {
            borderClass = 'border-left: 3px solid var(--accent-indigo);';
            bgClass = 'background: rgba(99,102,241,0.02);';
        } else if (project.category === 'submitted') {
            borderClass = 'border-left: 3px solid var(--accent-emerald);';
            bgClass = 'background: rgba(16,185,129,0.02);';
        } else if (project.category === 'secondary') {
            borderClass = 'border-left: 2px solid var(--accent-amber);';
            bgClass = 'background: rgba(245,158,11,0.01);';
        } else if (project.category === 'closed') {
            borderClass = 'border-left: 3px solid var(--accent-rose);';
            bgClass = 'background: rgba(239,68,68,0.02);';
        } else {
            borderClass = 'border-left: 2px solid var(--color-text-muted);';
            bgClass = 'background: rgba(255,255,255,0.01);';
        }
        
        let containerKey = project.priority === 'high' ? 'priority' : project.category;
        const container = containers[containerKey];
        if(!container) return;

        const urlHtml = project.url ? `<a href="${project.url}" target="_blank" style="color: var(--accent-cyan); text-decoration: none; display: flex; align-items: center; gap: 4px;">🌐 Project Link</a>` : '';

        const cardHtml = `
            <div class="glass-card" style="padding: 10px 14px; ${borderClass} ${bgClass} display: flex; flex-direction: column; gap: 4px; border-radius: 8px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-weight:700; font-size:13px; color:var(--color-text-primary);">${project.client} — ${project.title}</span>
                    <select class="status-select">
                        <option value="active" ${project.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="pending" ${project.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="blocked" ${project.status === 'blocked' ? 'selected' : ''}>Blocked</option>
                        <option value="completed" ${project.status === 'completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </div>
                <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--color-text-secondary);">
                    <span>Next: ${project.nextAction}</span>
                    <span style="font-family:var(--font-mono); color:var(--color-text-muted);">${project.date}</span>
                </div>
                ${project.description ? `<div style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">${project.description}</div>` : ''}
                <div style="margin-top: 4px; font-size: 10px; display: flex; gap: 8px; border-top: 1px dashed rgba(255,255,255,0.05); padding-top: 4px; align-items: center;">
                    <a href="#" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">📄 Summary</a>
                    ${urlHtml}
                </div>
            </div>
        `;
        
        container.innerHTML += cardHtml;
    });
}
