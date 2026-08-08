document.addEventListener('DOMContentLoaded', () => {
    // Shared styling for the lines to match the purple theme
    const lineOptions = {
        color: '#8B5CF6',
        size: 2,
        path: 'fluid', // nice curves
        startPlug: 'behind', // hide start behind node
        endPlug: 'arrow3', // arrow style
        endPlugSize: 1.2,
    };

    // Store lines in an array to manage resizing
    const lines = [];

    // Node 1 to Node 2
    lines.push(new LeaderLine(
        document.getElementById('node-1'),
        document.getElementById('node-2'),
        {
            ...lineOptions,
            path: 'straight',
            startSocket: 'right',
            endSocket: 'left'
        }
    ));

    // Node 2 to Node 3 (curved, bottom to top)
    lines.push(new LeaderLine(
        document.getElementById('node-2'),
        document.getElementById('node-3'),
        {
            ...lineOptions,
            startSocket: 'bottom',
            endSocket: 'top',
            startSocketGravity: [0, 60],
            endSocketGravity: [0, -60]
        }
    ));

    // Node 2 to Node 4 (straight down)
    lines.push(new LeaderLine(
        document.getElementById('node-2'),
        document.getElementById('node-4'),
        {
            ...lineOptions,
            startSocket: 'bottom',
            endSocket: 'top',
        }
    ));

    // Node 2 to Node 5 (curved, bottom to top)
    lines.push(new LeaderLine(
        document.getElementById('node-2'),
        document.getElementById('node-5'),
        {
            ...lineOptions,
            startSocket: 'bottom',
            endSocket: 'top',
            startSocketGravity: [0, 60],
            endSocketGravity: [0, -60]
        }
    ));

    // Node 3 to Node 6
    lines.push(new LeaderLine(
        document.getElementById('node-3'),
        document.getElementById('node-6'),
        {
            ...lineOptions,
            path: 'straight',
            startSocket: 'bottom',
            endSocket: 'top'
        }
    ));

    // Node 4 to Node 7
    lines.push(new LeaderLine(
        document.getElementById('node-4'),
        document.getElementById('node-7'),
        {
            ...lineOptions,
            path: 'straight',
            startSocket: 'bottom',
            endSocket: 'top'
        }
    ));

    // Node 5 to Node 8
    lines.push(new LeaderLine(
        document.getElementById('node-5'),
        document.getElementById('node-8'),
        {
            ...lineOptions,
            path: 'straight',
            startSocket: 'bottom',
            endSocket: 'top'
        }
    ));

    // Continuous positioning loop during animation (first 1.8 seconds)
    const startTime = performance.now();
    function animateLines(currentTime) {
        lines.forEach(line => line.position());
        if (currentTime - startTime < 1800) {
            requestAnimationFrame(animateLines);
        }
    }
    requestAnimationFrame(animateLines);

    // Update lines when resizing the window
    window.addEventListener('resize', () => {
        lines.forEach(line => line.position());
    });
    
    // Update lines when scrolling the container
    document.querySelector('.flowchart-container').addEventListener('scroll', () => {
        lines.forEach(line => line.position());
    });

    // --- Web Audio API Sound Effects ---
    let audioCtx = null;
    let isMuted = localStorage.getItem('sound_muted') === 'true';

    const soundToggleBtn = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const soundText = document.getElementById('soundText');

    function updateSoundUI() {
        if (soundToggleBtn) {
            if (isMuted) {
                soundToggleBtn.classList.add('muted');
                soundIcon.className = 'fa-solid fa-volume-xmark';
                soundText.textContent = 'Âm thanh: Tắt';
            } else {
                soundToggleBtn.classList.remove('muted');
                soundIcon.className = 'fa-solid fa-volume-high';
                soundText.textContent = 'Âm thanh: Bật';
            }
        }
    }

    // Apply initial sound UI from localStorage
    updateSoundUI();

    // --- Toast Notification Helper ---
    function showToast(message, iconClass = 'fa-info-circle', type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${iconClass} toast-icon"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 2.5s
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2500);
    }

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isMuted = !isMuted;
            localStorage.setItem('sound_muted', isMuted);
            updateSoundUI();
            if (isMuted) {
                showToast('Đã tắt âm thanh tương tác', 'fa-volume-xmark', 'info');
            } else {
                showToast('Đã bật âm thanh tương tác', 'fa-volume-high', 'success');
                playClickSound();
            }
        });
    }

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Soft hover blip sound
    function playHoverSound() {
        if (isMuted) return;
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.06);

            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.06);
        } catch (e) {}
    }

    // Pop click sound
    function playClickSound() {
        if (isMuted) return;
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {}
    }

    // --- Drag & Drop Node Movement & Interactive Positioning ---
    function initDraggableNodes() {
        document.querySelectorAll('.node').forEach(node => {
            let isDragging = false;
            let startMouseX = 0;
            let startMouseY = 0;
            let startNodeX = 0;
            let startNodeY = 0;
            let hasMoved = false;
            let clickTimer = null;

            node.addEventListener('mouseenter', playHoverSound);

            function onPointerDown(e) {
                if (e.target.closest('button') || e.target.closest('input')) return;
                
                isDragging = true;
                hasMoved = false;
                startMouseX = e.clientX;
                startMouseY = e.clientY;
                startNodeX = parseFloat(node.dataset.x || 0);
                startNodeY = parseFloat(node.dataset.y || 0);

                node.classList.add('is-dragging');
                document.addEventListener('pointermove', onPointerMove);
                document.addEventListener('pointerup', onPointerUp);
                document.addEventListener('pointercancel', onPointerUp);
            }

            function onPointerMove(e) {
                if (!isDragging) return;
                const dx = e.clientX - startMouseX;
                const dy = e.clientY - startMouseY;

                if (!hasMoved && Math.hypot(dx, dy) > 4) {
                    hasMoved = true;
                    if (clickTimer) {
                        clearTimeout(clickTimer);
                        clickTimer = null;
                    }
                }

                if (hasMoved) {
                    const newX = startNodeX + dx;
                    const newY = startNodeY + dy;
                    node.style.transform = `translate(${newX}px, ${newY}px)`;
                    node.dataset.x = newX;
                    node.dataset.y = newY;
                    lines.forEach(line => line.position());
                }
            }

            function onPointerUp(e) {
                if (!isDragging) return;
                isDragging = false;
                node.classList.remove('is-dragging');
                document.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('pointerup', onPointerUp);
                document.removeEventListener('pointercancel', onPointerUp);

                if (hasMoved) {
                    const posX = parseFloat(node.dataset.x || 0);
                    const posY = parseFloat(node.dataset.y || 0);

                    // Save coordinates to localStorage
                    const savedData = JSON.parse(localStorage.getItem('flowchart_nodes_data') || '{}');
                    savedData[node.id] = {
                        ...(savedData[node.id] || {}),
                        pos_x: posX,
                        pos_y: posY
                    };
                    localStorage.setItem('flowchart_nodes_data', JSON.stringify(savedData));

                    // Save to Supabase Cloud
                    syncNodeCoordinates(node.id, posX, posY);

                    lines.forEach(line => line.position());
                    showToast('Đã lưu vị trí khối trên sơ đồ!', 'fa-arrows-up-down-left-right', 'info');
                    playClickSound();
                }
            }

            node.addEventListener('pointerdown', onPointerDown);

            // Single click for link navigation
            node.addEventListener('click', (e) => {
                if (hasMoved) return;
                playClickSound();
                if (clickTimer) clearTimeout(clickTimer);

                clickTimer = setTimeout(() => {
                    const targetUrl = node.dataset.url;
                    if (targetUrl) {
                        showToast('Đang chuyển hướng tới bài học...', 'fa-arrow-up-right-from-square', 'info');
                        let fullUrl = targetUrl;
                        if (!/^https?:\/\//i.test(fullUrl)) {
                            fullUrl = 'https://' + fullUrl;
                        }
                        window.open(fullUrl, '_blank');
                    }
                    clickTimer = null;
                }, 250);
            });

            // Double click to open Edit Modal
            node.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                }
                openEditModal(node);
            });
        });
    }
    initDraggableNodes();

    // Store original default HTML node data
    const defaultNodesData = {};
    document.querySelectorAll('.node').forEach(node => {
        const titleEl = node.querySelector('.node-title');
        const descEl = node.querySelector('.node-desc');
        defaultNodesData[node.id] = {
            title: titleEl ? titleEl.textContent.trim() : '',
            desc: descEl ? descEl.textContent.trim() : ''
        };
    });

    // --- Node Editing Modal Logic ---
    const editModal = document.getElementById('editModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCancelBtn = document.getElementById('modalCancelBtn');
    const modalSaveBtn = document.getElementById('modalSaveBtn');
    const modalResetBtn = document.getElementById('modalResetBtn');
    const editTitleInput = document.getElementById('editTitle');
    const editDescInput = document.getElementById('editDesc');
    const editLinkInput = document.getElementById('editLink');

    let currentNode = null;

    // Icon Mapping
    const ICON_MAP = {
        monitor: 'fa-desktop',
        book: 'fa-book-open',
        gamepad: 'fa-gamepad',
        quiz: 'fa-clipboard-question',
        grad: 'fa-graduation-cap',
        cube: 'fa-cube'
    };

    let selectedIcon = 'monitor';
    let selectedColor = '#7C3AED';

    // Handle Icon selection click
    document.querySelectorAll('.icon-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.icon-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedIcon = btn.dataset.icon;
            playClickSound();
        });
    });

    // Handle Color selection click
    document.querySelectorAll('.color-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.dataset.color;
            playClickSound();
        });
    });

    function applyNodeCustomStyles(nodeEl, iconKey, colorHex, url) {
        if (!nodeEl) return;
        if (colorHex) {
            nodeEl.style.borderColor = colorHex;
            nodeEl.style.boxShadow = `-4px 0px 0px 0px ${colorHex}, 0 4px 10px rgba(0,0,0,0.03)`;
        }
        if (iconKey && ICON_MAP[iconKey]) {
            const iconContainer = nodeEl.querySelector('.node-inner');
            let iconEl = nodeEl.querySelector('.node-icon');
            if (iconContainer) {
                const newIcon = document.createElement('i');
                newIcon.className = `fa-solid ${ICON_MAP[iconKey]} node-icon`;
                newIcon.style.color = colorHex || '#7C3AED';
                newIcon.style.fontSize = '20px';
                newIcon.style.marginTop = '2px';
                if (iconEl) {
                    iconEl.replaceWith(newIcon);
                } else {
                    iconContainer.insertBefore(newIcon, iconContainer.firstChild);
                }
            }
        }
        // Link Badge handling
        let linkBadge = nodeEl.querySelector('.node-link-badge');
        if (url) {
            nodeEl.dataset.url = url;
            if (!linkBadge) {
                linkBadge = document.createElement('div');
                linkBadge.className = 'node-link-badge';
                linkBadge.title = 'Mở liên kết: ' + url;
                linkBadge.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';
                nodeEl.appendChild(linkBadge);
            } else {
                linkBadge.title = 'Mở liên kết: ' + url;
            }
        } else {
            delete nodeEl.dataset.url;
            if (linkBadge) linkBadge.remove();
        }
    }

    // Load saved node data from localStorage
    function loadSavedNodes() {
        const savedData = localStorage.getItem('flowchart_nodes_data');
        if (savedData) {
            try {
                const nodesData = JSON.parse(savedData);
                Object.keys(nodesData).forEach(id => {
                    const nodeEl = document.getElementById(id);
                    if (nodeEl) {
                        const data = nodesData[id];
                        const titleEl = nodeEl.querySelector('.node-title');
                        const descEl = nodeEl.querySelector('.node-desc');
                        if (titleEl && data.title) titleEl.textContent = data.title;
                        if (descEl && data.desc) descEl.textContent = data.desc;
                        if (data.icon || data.color || data.url) {
                            applyNodeCustomStyles(nodeEl, data.icon, data.color, data.url);
                        }
                        if (data.pos_x !== undefined && data.pos_y !== undefined && (data.pos_x !== 0 || data.pos_y !== 0)) {
                            nodeEl.style.transform = `translate(${data.pos_x}px, ${data.pos_y}px)`;
                            nodeEl.dataset.x = data.pos_x;
                            nodeEl.dataset.y = data.pos_y;
                        }
                    }
                });
            } catch (e) {}
        }
    }
    loadSavedNodes();

    function openEditModal(node) {
        currentNode = node;
        const titleEl = node.querySelector('.node-title');
        const descEl = node.querySelector('.node-desc');

        editTitleInput.value = titleEl ? titleEl.textContent.trim() : '';
        editDescInput.value = descEl ? descEl.textContent.trim() : '';

        // Retrieve current node's data or defaults
        const savedData = JSON.parse(localStorage.getItem('flowchart_nodes_data') || '{}');
        const nodeData = savedData[node.id] || {};

        editLinkInput.value = nodeData.url || '';
        selectedIcon = nodeData.icon || 'monitor';
        selectedColor = nodeData.color || '#7C3AED';

        // Update modal UI active buttons
        document.querySelectorAll('.icon-opt').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.icon === selectedIcon);
        });
        document.querySelectorAll('.color-opt').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.color === selectedColor);
        });

        editModal.classList.add('active');
        editTitleInput.focus();
    }

    function closeEditModal() {
        editModal.classList.remove('active');
        currentNode = null;
    }

    function saveNodeChanges() {
        if (!currentNode) return;

        const titleEl = currentNode.querySelector('.node-title');
        const descEl = currentNode.querySelector('.node-desc');

        const newTitle = editTitleInput.value.trim();
        const newDesc = editDescInput.value.trim();
        const newUrl = editLinkInput.value.trim();

        if (newTitle && titleEl) titleEl.textContent = newTitle;
        if (descEl) descEl.textContent = newDesc || 'Nhấp đúp chuột để chỉ...';

        applyNodeCustomStyles(currentNode, selectedIcon, selectedColor, newUrl);

        // Save to localStorage
        const savedData = JSON.parse(localStorage.getItem('flowchart_nodes_data') || '{}');
        const posX = parseFloat(currentNode.dataset.x || 0);
        const posY = parseFloat(currentNode.dataset.y || 0);

        savedData[currentNode.id] = {
            title: newTitle,
            desc: newDesc,
            url: newUrl,
            icon: selectedIcon,
            color: selectedColor,
            pos_x: posX,
            pos_y: posY
        };
        localStorage.setItem('flowchart_nodes_data', JSON.stringify(savedData));

        // Sync to Supabase Cloud
        syncNodeToSupabase(currentNode.id, savedData[currentNode.id]);

        // Reposition LeaderLines
        lines.forEach(line => line.position());

        closeEditModal();
        showToast('Đã cập nhật liên kết & thông tin khối thành công!', 'fa-circle-check', 'success');
        playClickSound();
    }

    function resetNodeToDefault() {
        if (!currentNode) return;

        const defaults = defaultNodesData[currentNode.id];
        if (defaults) {
            const titleEl = currentNode.querySelector('.node-title');
            const descEl = currentNode.querySelector('.node-desc');

            if (titleEl) titleEl.textContent = defaults.title;
            if (descEl) descEl.textContent = defaults.desc;

            // Reset inline styles & transform
            currentNode.style.borderColor = '#7C3AED';
            currentNode.style.boxShadow = `-4px 0px 0px 0px #7C3AED, 0 4px 10px rgba(0,0,0,0.03)`;
            currentNode.style.transform = '';
            delete currentNode.dataset.x;
            delete currentNode.dataset.y;

            // Reset icon to default computer image
            const iconContainer = currentNode.querySelector('.node-inner');
            let iconEl = currentNode.querySelector('.node-icon');
            if (iconContainer && iconEl) {
                const defaultImg = document.createElement('img');
                defaultImg.src = 'https://img.icons8.com/color/48/monitor--v1.png';
                defaultImg.alt = 'icon';
                defaultImg.className = 'node-icon';
                iconEl.replaceWith(defaultImg);
            }

            // Remove URL & link badge
            delete currentNode.dataset.url;
            const badge = currentNode.querySelector('.node-link-badge');
            if (badge) badge.remove();

            // Delete custom entry from localStorage
            const savedData = JSON.parse(localStorage.getItem('flowchart_nodes_data') || '{}');
            delete savedData[currentNode.id];
            localStorage.setItem('flowchart_nodes_data', JSON.stringify(savedData));

            // Sync reset to Supabase Cloud
            syncNodeToSupabase(currentNode.id, {
                title: defaults.title,
                desc: defaults.desc,
                url: '',
                icon: 'monitor',
                color: '#7C3AED',
                pos_x: 0,
                pos_y: 0
            });

            // Reposition LeaderLines
            lines.forEach(line => line.position());
        }

        closeEditModal();
        showToast('Đã khôi phục cài đặt mặc định của khối!', 'fa-rotate-left', 'info');
        playClickSound();
    }

    modalCloseBtn?.addEventListener('click', closeEditModal);
    modalCancelBtn?.addEventListener('click', closeEditModal);
    modalSaveBtn?.addEventListener('click', saveNodeChanges);
    modalResetBtn?.addEventListener('click', resetNodeToDefault);

    // Close on overlay click outside card
    editModal?.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });

    // Save on Enter key inside inputs
    [editTitleInput, editDescInput, editLinkInput].forEach(input => {
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveNodeChanges();
            if (e.key === 'Escape') closeEditModal();
        });
    });

    // --- Real-time Search Box Logic ---
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const searchCountBadge = document.getElementById('searchCountBadge');

    function performSearch() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const nodes = document.querySelectorAll('.node');

        if (!query) {
            nodes.forEach(node => {
                node.classList.remove('search-dimmed', 'search-match');
            });
            if (searchCountBadge) {
                searchCountBadge.classList.remove('visible', 'no-match');
                searchCountBadge.textContent = '';
            }
            return;
        }

        let firstMatch = null;
        let matchCount = 0;

        nodes.forEach(node => {
            const title = (node.querySelector('.node-title')?.textContent || '').toLowerCase();
            const desc = (node.querySelector('.node-desc')?.textContent || '').toLowerCase();

            if (title.includes(query) || desc.includes(query)) {
                node.classList.remove('search-dimmed');
                node.classList.add('search-match');
                matchCount++;
                if (!firstMatch) firstMatch = node;
            } else {
                node.classList.remove('search-match');
                node.classList.add('search-dimmed');
            }
        });

        if (searchCountBadge) {
            searchCountBadge.classList.add('visible');
            if (matchCount > 0) {
                searchCountBadge.classList.remove('no-match');
                searchCountBadge.textContent = `Tìm thấy ${matchCount} kết quả`;
            } else {
                searchCountBadge.classList.add('no-match');
                searchCountBadge.textContent = `Không tìm thấy`;
            }
        }

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }

    searchInput?.addEventListener('input', performSearch);

    searchClearBtn?.addEventListener('click', () => {
        if (searchInput) {
            searchInput.value = '';
            performSearch();
            searchInput.focus();
        }
    });

    // --- Reset All Nodes Logic ---
    const resetAllNodesBtn = document.getElementById('resetAllNodesBtn');

    function resetAllNodes() {
        if (confirm('Bạn có chắc chắn muốn khôi phục toàn bộ 8 khối về cài đặt sơ đồ gốc không?')) {
            localStorage.removeItem('flowchart_nodes_data');

            document.querySelectorAll('.node').forEach(node => {
                const defaults = defaultNodesData[node.id];
                if (defaults) {
                    const titleEl = node.querySelector('.node-title');
                    const descEl = node.querySelector('.node-desc');
                    if (titleEl) titleEl.textContent = defaults.title;
                    if (descEl) descEl.textContent = defaults.desc;
                }

                node.style.borderColor = '#7C3AED';
                node.style.boxShadow = `-4px 0px 0px 0px #7C3AED, 0 4px 10px rgba(0,0,0,0.03)`;
                node.style.transform = '';
                delete node.dataset.x;
                delete node.dataset.y;

                const iconContainer = node.querySelector('.node-inner');
                let iconEl = node.querySelector('.node-icon');
                if (iconContainer && iconEl) {
                    const defaultImg = document.createElement('img');
                    defaultImg.src = 'https://img.icons8.com/color/48/monitor--v1.png';
                    defaultImg.alt = 'icon';
                    defaultImg.className = 'node-icon';
                    iconEl.replaceWith(defaultImg);
                }

                delete node.dataset.url;
                const badge = node.querySelector('.node-link-badge');
                if (badge) badge.remove();

                // Sync all resets to Supabase Cloud
                if (defaults) {
                    syncNodeToSupabase(node.id, {
                        title: defaults.title,
                        desc: defaults.desc,
                        url: '',
                        icon: 'monitor',
                        color: '#7C3AED',
                        pos_x: 0,
                        pos_y: 0
                    });
                }
            });

            lines.forEach(line => line.position());

            showToast('Đã khôi phục toàn bộ sơ đồ về mặc định gốc!', 'fa-rotate', 'success');
            playClickSound();
        }
    }

    resetAllNodesBtn?.addEventListener('click', resetAllNodes);

    // --- Supabase Cloud Database Integration ---
    let supabaseClient = null;
    const supabaseConfigBtn = document.getElementById('supabaseConfigBtn');
    const supabaseModal = document.getElementById('supabaseModal');
    const supabaseModalCloseBtn = document.getElementById('supabaseModalCloseBtn');
    const supabaseCancelBtn = document.getElementById('supabaseCancelBtn');
    const supabaseSaveConnectBtn = document.getElementById('supabaseSaveConnectBtn');
    const supabaseDisconnectBtn = document.getElementById('supabaseDisconnectBtn');
    const supabaseUrlInput = document.getElementById('supabaseUrlInput');
    const supabaseKeyInput = document.getElementById('supabaseKeyInput');
    const supabaseStatusText = document.getElementById('supabaseStatusText');
    const supabaseStatusIcon = document.getElementById('supabaseStatusIcon');
    const statusDot = document.getElementById('statusDot');
    const supabaseStatusDetail = document.getElementById('supabaseStatusDetail');

    function updateSupabaseUI(isConnected, detailMsg = '') {
        if (isConnected) {
            supabaseConfigBtn?.classList.add('connected');
            if (supabaseStatusText) supabaseStatusText.textContent = 'Supabase: Đã kết nối';
            if (supabaseStatusIcon) supabaseStatusIcon.className = 'fa-solid fa-cloud-check';
            if (statusDot) statusDot.classList.add('connected');
            if (supabaseStatusDetail) supabaseStatusDetail.textContent = detailMsg || 'Đã kết nối thành công tới Supabase Database! Dữ liệu đang được đồng bộ đám mây.';
        } else {
            supabaseConfigBtn?.classList.remove('connected');
            if (supabaseStatusText) supabaseStatusText.textContent = 'Supabase: Cục bộ';
            if (supabaseStatusIcon) supabaseStatusIcon.className = 'fa-solid fa-cloud';
            if (statusDot) statusDot.classList.remove('connected');
            if (supabaseStatusDetail) supabaseStatusDetail.textContent = detailMsg || 'Chưa cấu hình kết nối Supabase (đang dùng bộ nhớ cục bộ).';
        }
    }

    async function initSupabase(isManual = false) {
        const savedUrl = localStorage.getItem('supabase_url') || (window.SUPABASE_DEFAULT_CONFIG?.url !== 'https://YOUR_PROJECT_ID.supabase.co' ? window.SUPABASE_DEFAULT_CONFIG?.url : '');
        const savedKey = localStorage.getItem('supabase_key') || (window.SUPABASE_DEFAULT_CONFIG?.anonKey !== 'YOUR_SUPABASE_ANON_PUBLIC_KEY' ? window.SUPABASE_DEFAULT_CONFIG?.anonKey : '');

        if (supabaseUrlInput) supabaseUrlInput.value = savedUrl || '';
        if (supabaseKeyInput) supabaseKeyInput.value = savedKey || '';

        if (!savedUrl || !savedKey || !window.supabase) {
            updateSupabaseUI(false);
            return;
        }

        try {
            supabaseClient = window.supabase.createClient(savedUrl, savedKey);
            // Test query on nodes table
            const { data, error } = await supabaseClient.from('nodes').select('*').limit(8);
            if (error) throw error;

            updateSupabaseUI(true, `Kết nối Cloud OK! Tìm thấy ${data.length} khối dữ liệu trên Supabase.`);
            if (isManual) {
                showToast('Kết nối thành công tới Supabase Cloud!', 'fa-cloud-check', 'success');
            }

            // If data exists on Supabase, apply to DOM
            if (data && data.length > 0) {
                const cloudNodes = {};
                data.forEach(item => {
                    cloudNodes[item.id] = {
                        title: item.title,
                        desc: item.description,
                        url: item.url,
                        icon: item.icon,
                        color: item.accent_color,
                        pos_x: item.pos_x || 0,
                        pos_y: item.pos_y || 0
                    };
                    const nodeEl = document.getElementById(item.id);
                    if (nodeEl) {
                        const titleEl = nodeEl.querySelector('.node-title');
                        const descEl = nodeEl.querySelector('.node-desc');
                        if (titleEl && item.title) titleEl.textContent = item.title;
                        if (descEl && item.description) descEl.textContent = item.description;
                        applyNodeCustomStyles(nodeEl, item.icon, item.accent_color, item.url);
                        if (item.pos_x || item.pos_y) {
                            nodeEl.style.transform = `translate(${item.pos_x}px, ${item.pos_y}px)`;
                            nodeEl.dataset.x = item.pos_x;
                            nodeEl.dataset.y = item.pos_y;
                        }
                    }
                });
                localStorage.setItem('flowchart_nodes_data', JSON.stringify(cloudNodes));
                lines.forEach(line => line.position());
            }
        } catch (err) {
            console.warn('Lỗi kết nối Supabase:', err);
            updateSupabaseUI(false, `Lỗi kết nối: ${err.message || 'Không thể truy cập bảng nodes'}`);
            if (isManual) {
                showToast('Không thể kết nối Supabase. Vui lòng kiểm tra lại URL & Key!', 'fa-triangle-exclamation', 'error');
            }
        }
    }

    async function syncNodeToSupabase(nodeId, nodeData) {
        if (!supabaseClient) return;
        try {
            const { error } = await supabaseClient.from('nodes').upsert({
                id: nodeId,
                title: nodeData.title || '',
                description: nodeData.desc || '',
                url: nodeData.url || '',
                icon: nodeData.icon || 'monitor',
                accent_color: nodeData.color || '#7C3AED',
                pos_x: Math.round(nodeData.pos_x || 0),
                pos_y: Math.round(nodeData.pos_y || 0),
                updated_at: new Date().toISOString()
            });
            if (error) throw error;
            showToast('Đã đồng bộ khối lên Supabase Cloud!', 'fa-cloud-arrow-up', 'success');
        } catch (err) {
            console.error('Lỗi đồng bộ Supabase:', err);
            showToast('Lỗi đồng bộ lên Supabase: ' + (err.message || ''), 'fa-triangle-exclamation', 'error');
        }
    }

    async function syncNodeCoordinates(nodeId, posX, posY) {
        if (!supabaseClient) return;
        try {
            await supabaseClient.from('nodes').upsert({
                id: nodeId,
                pos_x: Math.round(posX),
                pos_y: Math.round(posY),
                updated_at: new Date().toISOString()
            });
        } catch (err) {
            console.warn('Lỗi lưu tọa độ Supabase:', err);
        }
    }

    supabaseConfigBtn?.addEventListener('click', () => {
        supabaseModal?.classList.add('active');
    });

    supabaseModalCloseBtn?.addEventListener('click', () => {
        supabaseModal?.classList.remove('active');
    });

    supabaseCancelBtn?.addEventListener('click', () => {
        supabaseModal?.classList.remove('active');
    });

    // --- Student Management & Learning Progress Tracking (Supabase) ---
    const studentProfileBtn = document.getElementById('studentProfileBtn');
    const currentStudentNameEl = document.getElementById('currentStudentName');
    const studentProgressPill = document.getElementById('studentProgressPill');
    const studentModal = document.getElementById('studentModal');
    const studentModalCloseBtn = document.getElementById('studentModalCloseBtn');
    const studentModalCancelBtn = document.getElementById('studentModalCancelBtn');
    const studentSaveBtn = document.getElementById('studentSaveBtn');
    const studentResetProgressBtn = document.getElementById('studentResetProgressBtn');
    const studentNameInput = document.getElementById('studentNameInput');
    const studentClassInput = document.getElementById('studentClassInput');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const lessonsChecklist = document.getElementById('lessonsChecklist');
    const tabCurrentStudent = document.getElementById('tabCurrentStudent');
    const tabClassList = document.getElementById('tabClassList');
    const tabContentCurrent = document.getElementById('tabContentCurrent');
    const tabContentClass = document.getElementById('tabContentClass');
    const classTableBody = document.getElementById('classTableBody');
    const classSummaryText = document.getElementById('classSummaryText');
    const refreshClassListBtn = document.getElementById('refreshClassListBtn');

    let currentStudent = {
        name: localStorage.getItem('current_student_name') || 'Đào Thùy Anh',
        classroom: localStorage.getItem('current_student_class') || '5A'
    };
    let completedLessons = JSON.parse(localStorage.getItem('student_completed_lessons') || '["node-1", "node-3"]');

    function updateStudentUI() {
        if (currentStudentNameEl) {
            currentStudentNameEl.textContent = `Học sinh: ${currentStudent.name} (${currentStudent.classroom})`;
        }
        if (studentNameInput) studentNameInput.value = currentStudent.name;
        if (studentClassInput) studentClassInput.value = currentStudent.classroom;

        const totalNodes = 8;
        const count = completedLessons.length;
        const percent = Math.round((count / totalNodes) * 100);

        if (studentProgressPill) {
            studentProgressPill.textContent = `${count}/${totalNodes}`;
        }
        if (progressBarFill) {
            progressBarFill.style.width = `${percent}%`;
        }
        if (progressPercentage) {
            progressPercentage.textContent = `${percent}% (${count}/${totalNodes} bài)`;
        }

        // Update node completed badges
        document.querySelectorAll('.node').forEach(node => {
            let badge = node.querySelector('.node-completed-badge');
            if (completedLessons.includes(node.id)) {
                if (!badge) {
                    badge = document.createElement('div');
                    badge.className = 'node-completed-badge';
                    badge.title = 'Đã hoàn thành bài học này!';
                    badge.innerHTML = '<i class="fa-solid fa-check"></i>';
                    node.appendChild(badge);
                }
            } else {
                if (badge) badge.remove();
            }
        });
    }

    function renderChecklist() {
        if (!lessonsChecklist) return;
        lessonsChecklist.innerHTML = '';

        document.querySelectorAll('.node').forEach(node => {
            const title = node.querySelector('.node-title')?.textContent.trim() || node.id;
            const isChecked = completedLessons.includes(node.id);

            const item = document.createElement('div');
            item.className = 'checklist-item';
            item.innerHTML = `
                <div class="checklist-item-left">
                    <input type="checkbox" class="checklist-checkbox" id="chk_${node.id}" ${isChecked ? 'checked' : ''}>
                    <label for="chk_${node.id}" style="cursor:pointer;">${title}</label>
                </div>
                <span class="badge-progress" style="background:${isChecked ? '#ECFDF5' : '#F1F5F9'}; color:${isChecked ? '#059669' : '#64748B'};">
                    ${isChecked ? 'Đã hoàn thành' : 'Chưa học'}
                </span>
            `;

            const checkbox = item.querySelector('.checklist-checkbox');
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                toggleLessonCompletion(node.id, checkbox.checked);
            });

            item.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    toggleLessonCompletion(node.id, checkbox.checked);
                }
            });

            lessonsChecklist.appendChild(item);
        });
    }

    async function toggleLessonCompletion(nodeId, isCompleted) {
        if (isCompleted) {
            if (!completedLessons.includes(nodeId)) {
                completedLessons.push(nodeId);
            }
        } else {
            completedLessons = completedLessons.filter(id => id !== nodeId);
        }

        localStorage.setItem('student_completed_lessons', JSON.stringify(completedLessons));
        updateStudentUI();
        renderChecklist();
        playClickSound();

        // Sync student progress to Supabase
        if (supabaseClient) {
            try {
                const nodeEl = document.getElementById(nodeId);
                const nodeTitle = nodeEl?.querySelector('.node-title')?.textContent || nodeId;

                // 1. Log progress record
                await supabaseClient.from('student_progress').upsert({
                    student_name: currentStudent.name,
                    classroom: currentStudent.classroom,
                    node_id: nodeId,
                    node_title: nodeTitle,
                    is_completed: isCompleted,
                    accessed_at: new Date().toISOString()
                });

                // 2. Update student aggregate profile
                await supabaseClient.from('students').upsert({
                    student_name: currentStudent.name,
                    classroom: currentStudent.classroom,
                    completed_lessons_count: completedLessons.length,
                    last_active: new Date().toISOString()
                }, { onConflict: 'student_name' });

                showToast(`Đã ghi nhận tiến độ "${nodeTitle}" vào Supabase!`, 'fa-cloud-arrow-up', 'success');
            } catch (err) {
                console.warn('Lỗi ghi tiến độ Supabase:', err);
            }
        }
    }

    async function fetchClassListFromSupabase() {
        if (!classTableBody) return;
        classTableBody.innerHTML = '<tr><td colspan="6" class="table-loading" style="text-align:center; padding:20px; color:#64748B;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải dữ liệu từ Supabase Cloud...</td></tr>';

        if (!supabaseClient) {
            classTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#EF4444;"><i class="fa-solid fa-cloud-slash"></i> Chưa kết nối Supabase Cloud. Hãy bấm "Supabase: Cục bộ" để kết nối trước nhé!</td></tr>';
            if (classSummaryText) classSummaryText.textContent = 'Trạng thái: Chưa kết nối Supabase';
            return;
        }

        try {
            const { data, error } = await supabaseClient.from('students').select('*').order('completed_lessons_count', { ascending: false });
            if (error) throw error;

            if (!data || data.length === 0) {
                classTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#64748B;">Chưa có học sinh nào nộp tiến độ trên Supabase. Hãy bấm "Lưu & Cập nhật" để ghi nhận bạn đầu tiên!</td></tr>';
                if (classSummaryText) classSummaryText.textContent = 'Tổng số: 0 học sinh';
                return;
            }

            if (classSummaryText) classSummaryText.textContent = `Tổng số: ${data.length} học sinh trong hệ thống`;
            classTableBody.innerHTML = '';

            data.forEach((st, idx) => {
                const percent = Math.round(((st.completed_lessons_count || 0) / 8) * 100);
                const lastTime = st.last_active ? new Date(st.last_active).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : 'Vừa xong';
                const isCurrent = st.student_name === currentStudent.name;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight:600; color:#64748B;">#${idx + 1}</td>
                    <td style="font-weight:600; color:#1E293B;">
                        ${st.student_name} ${isCurrent ? '<span style="color:#2563EB; font-size:11px;">(Đang chọn)</span>' : ''}
                    </td>
                    <td><span class="badge-progress">${st.classroom || '5A'}</span></td>
                    <td>
                        <span style="font-weight:700; color:${percent >= 75 ? '#059669' : (percent >= 50 ? '#2563EB' : '#D97706')};">
                            ${st.completed_lessons_count || 0}/8 (${percent}%)
                        </span>
                    </td>
                    <td style="font-size:12px; color:#64748B;">${lastTime}</td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-primary select-student-btn" data-name="${st.student_name}" data-class="${st.classroom || '5A'}">
                            <i class="fa-solid fa-user-check"></i> Chọn
                        </button>
                    </td>
                `;

                tr.querySelector('.select-student-btn')?.addEventListener('click', () => {
                    currentStudent.name = st.student_name;
                    currentStudent.classroom = st.classroom || '5A';
                    localStorage.setItem('current_student_name', currentStudent.name);
                    localStorage.setItem('current_student_class', currentStudent.classroom);
                    updateStudentUI();
                    renderChecklist();
                    fetchStudentProgressFromSupabase(st.student_name);
                    showToast(`Đã chuyển sang hồ sơ học sinh: ${st.student_name}`, 'fa-user-graduate', 'success');
                    tabCurrentStudent?.click();
                });

                classTableBody.appendChild(tr);
            });
        } catch (err) {
            console.error('Lỗi tải danh sách lớp:', err);
            classTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#EF4444;">Lỗi: ${err.message || 'Không thể truy vấn bảng students'}</td></tr>`;
        }
    }

    async function fetchStudentProgressFromSupabase(studentName) {
        if (!supabaseClient) return;
        try {
            const { data } = await supabaseClient.from('student_progress').select('*').eq('student_name', studentName).eq('is_completed', true);
            if (data) {
                completedLessons = data.map(d => d.node_id);
                localStorage.setItem('student_completed_lessons', JSON.stringify(completedLessons));
                updateStudentUI();
                renderChecklist();
            }
        } catch (e) {}
    }

    // Tab switching
    tabCurrentStudent?.addEventListener('click', () => {
        tabCurrentStudent.classList.add('active');
        tabClassList?.classList.remove('active');
        if (tabContentCurrent) tabContentCurrent.style.display = 'block';
        if (tabContentClass) tabContentClass.style.display = 'none';
        playClickSound();
    });

    tabClassList?.addEventListener('click', () => {
        tabClassList.classList.add('active');
        tabCurrentStudent?.classList.remove('active');
        if (tabContentCurrent) tabContentCurrent.style.display = 'none';
        if (tabContentClass) tabContentClass.style.display = 'block';
        fetchClassListFromSupabase();
        playClickSound();
    });

    refreshClassListBtn?.addEventListener('click', () => {
        fetchClassListFromSupabase();
        playClickSound();
    });

    studentProfileBtn?.addEventListener('click', () => {
        updateStudentUI();
        renderChecklist();
        studentModal?.classList.add('active');
    });

    studentModalCloseBtn?.addEventListener('click', () => {
        studentModal?.classList.remove('active');
    });

    studentModalCancelBtn?.addEventListener('click', () => {
        studentModal?.classList.remove('active');
    });

    studentSaveBtn?.addEventListener('click', async () => {
        const name = studentNameInput ? studentNameInput.value.trim() : '';
        const classroom = studentClassInput ? studentClassInput.value.trim() : '5A';

        if (!name) {
            alert('Vui lòng nhập tên học sinh!');
            return;
        }

        currentStudent.name = name;
        currentStudent.classroom = classroom;
        localStorage.setItem('current_student_name', name);
        localStorage.setItem('current_student_class', classroom);

        updateStudentUI();

        // Update Node-2 title if needed
        const node2 = document.getElementById('node-2');
        if (node2) {
            const descEl = node2.querySelector('.node-desc');
            if (descEl) descEl.textContent = `HS: ${name} - Lớp ${classroom}`;
        }

        // Save to Supabase
        if (supabaseClient) {
            try {
                await supabaseClient.from('students').upsert({
                    student_name: name,
                    classroom: classroom,
                    completed_lessons_count: completedLessons.length,
                    last_active: new Date().toISOString()
                }, { onConflict: 'student_name' });
            } catch (e) {}
        }

        studentModal?.classList.add('active');
        showToast(`Đã lưu hồ sơ học sinh: ${name} (${classroom})!`, 'fa-floppy-disk', 'success');
        playClickSound();
    });

    studentResetProgressBtn?.addEventListener('click', async () => {
        if (confirm(`Đặt lại tiến độ bài học của học sinh "${currentStudent.name}" về 0?`)) {
            completedLessons = [];
            localStorage.setItem('student_completed_lessons', JSON.stringify([]));
            updateStudentUI();
            renderChecklist();

            if (supabaseClient) {
                try {
                    await supabaseClient.from('student_progress').delete().eq('student_name', currentStudent.name);
                    await supabaseClient.from('students').upsert({
                        student_name: currentStudent.name,
                        classroom: currentStudent.classroom,
                        completed_lessons_count: 0,
                        last_active: new Date().toISOString()
                    }, { onConflict: 'student_name' });
                } catch (e) {}
            }

            showToast('Đã đặt lại tiến độ học tập về 0!', 'fa-rotate-left', 'info');
            playClickSound();
        }
    });

    // Make Node-2 click open the Student Modal
    const node2El = document.getElementById('node-2');
    node2El?.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        updateStudentUI();
        renderChecklist();
        studentModal?.classList.add('active');
    });

    // Auto-init UI
    updateStudentUI();
    renderChecklist();

    supabaseSaveConnectBtn?.addEventListener('click', async () => {
        const url = supabaseUrlInput.value.trim();
        const key = supabaseKeyInput.value.trim();

        if (!url || !key) {
            alert('Vui lòng nhập đầy đủ Supabase Project URL và Public Anon Key!');
            return;
        }

        localStorage.setItem('supabase_url', url);
        localStorage.setItem('supabase_key', key);
        await initSupabase(true);
        supabaseModal?.classList.remove('active');
    });

    supabaseDisconnectBtn?.addEventListener('click', () => {
        if (confirm('Thầy (cô) có chắc chắn muốn ngắt kết nối với Supabase Cloud không?')) {
            localStorage.removeItem('supabase_url');
            localStorage.removeItem('supabase_key');
            supabaseClient = null;
            if (supabaseUrlInput) supabaseUrlInput.value = '';
            if (supabaseKeyInput) supabaseKeyInput.value = '';
            updateSupabaseUI(false);
            supabaseModal?.classList.remove('active');
            showToast('Đã ngắt kết nối với Supabase', 'fa-link-slash', 'info');
        }
    });

    // Auto-init Supabase on load
    initSupabase();

    // --- Multi-Subject Diagram & Lesson Tree Management ---
    const subjectSelector = document.getElementById('subjectSelector');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const subjectModal = document.getElementById('subjectModal');
    const subjectModalCloseBtn = document.getElementById('subjectModalCloseBtn');
    const subjectModalCancelBtn = document.getElementById('subjectModalCancelBtn');
    const saveNewSubjectBtn = document.getElementById('saveNewSubjectBtn');
    const newSubjectName = document.getElementById('newSubjectName');
    const newSubjectDesc = document.getElementById('newSubjectDesc');

    let selectedSubjectColor = '#7C3AED';
    let currentSubjectId = localStorage.getItem('current_diagram_subject') || 'tinhoc';

    const SUBJECT_TEMPLATES = {
        tinhoc: {
            name: 'Môn Tin học',
            color: '#7C3AED',
            icon: 'monitor',
            nodes: {
                'node-1': { title: 'WELCOME TO ANH DAO AI STUDY', desc: 'Nhấp đúp chuột để chỉnh sửa thông tin', icon: 'monitor', color: '#7C3AED' },
                'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'monitor', color: '#7C3AED' },
                'node-3': { title: 'BÀI HỌC MÔN TIN HỌC', desc: 'Khám phá thế giới máy tính & lập trình', icon: 'book', color: '#7C3AED' },
                'node-4': { title: 'TRÒ CHƠI MÔN TIN HỌC', desc: 'Luyện gõ 10 ngón & trò chơi tư duy', icon: 'gamepad', color: '#7C3AED' },
                'node-5': { title: 'BÀI KIỂM TRA MÔN TIN HỌC', desc: 'Trắc nghiệm kiến thức Tin học kỳ 1', icon: 'quiz', color: '#7C3AED' },
                'node-6': { title: 'TIN HỌC LỚP 5 - PHẦN MỀM', desc: 'Làm quen với soạn thảo văn bản Word', icon: 'monitor', color: '#7C3AED' },
                'node-7': { title: 'TIN HỌC LỚP 5 - TRÌNH CHIẾU', desc: 'Thiết kế bài thuyết trình PowerPoint', icon: 'monitor', color: '#7C3AED' },
                'node-8': { title: 'TIN HỌC LỚP 5 - INTERNET', desc: 'Tìm kiếm thông tin an toàn trên mạng', icon: 'monitor', color: '#7C3AED' }
            }
        },
        toan: {
            name: 'Môn Toán học',
            color: '#2563EB',
            icon: 'cube',
            nodes: {
                'node-1': { title: 'HỆ THỐNG TOÁN HỌC TIỂU HỌC', desc: 'Học toán tư duy & rèn luyện logic', icon: 'cube', color: '#2563EB' },
                'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'grad', color: '#2563EB' },
                'node-3': { title: 'BÀI HỌC SỐ HỌC & PHÂN SỐ', desc: 'Cộng trừ nhân chia số thập phân', icon: 'book', color: '#2563EB' },
                'node-4': { title: 'TRÒ CHƠI GIẢI ĐỐ TOÁN NHANH', desc: 'Thi đấu tính nhẩm siêu tốc', icon: 'gamepad', color: '#2563EB' },
                'node-5': { title: 'BÀI KIỂM TRA TOÁN HỌC', desc: 'Đề thi khảo sát chất lượng tháng', icon: 'quiz', color: '#2563EB' },
                'node-6': { title: 'HÌNH HỌC LỚP 5', desc: 'Tính diện tích hình thang, hình tròn', icon: 'cube', color: '#2563EB' },
                'node-7': { title: 'TOÁN CHUYỂN ĐỘNG', desc: 'Bài toán vận tốc, quãng đường, thời gian', icon: 'cube', color: '#2563EB' },
                'node-8': { title: 'TOÁN NÂNG CAO', desc: 'Tỉ số phần trăm và toán suy luận', icon: 'cube', color: '#2563EB' }
            }
        },
        tiengviet: {
            name: 'Môn Tiếng Việt',
            color: '#059669',
            icon: 'book',
            nodes: {
                'node-1': { title: 'KHÁM PHÁ TIẾNG VIỆT LỚP 5', desc: 'Hành trình làm giàu vốn từ tiếng Việt', icon: 'book', color: '#059669' },
                'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'grad', color: '#059669' },
                'node-3': { title: 'TẬP ĐỌC & KỂ CHUYỆN', desc: 'Bài học Đất nước mến yêu', icon: 'book', color: '#059669' },
                'node-4': { title: 'TRÒ CHƠI Ô CHỮ TIẾNG VIỆT', desc: 'Ghép từ nối câu & tìm từ đồng nghĩa', icon: 'gamepad', color: '#059669' },
                'node-5': { title: 'KIỂM TRA CHÍNH TẢ & TẬP LÀM VĂN', desc: 'Bài văn tả cảnh thiên nhiên', icon: 'quiz', color: '#059669' },
                'node-6': { title: 'LUYỆN TỪ VÀ CÂU', desc: 'Từ nhiều nghĩa và đại từ xưng hô', icon: 'book', color: '#059669' },
                'node-7': { title: 'TẬP LÀM VĂN MIÊU TẢ', desc: 'Kỹ năng quan sát và diễn đạt', icon: 'book', color: '#059669' },
                'node-8': { title: 'THƠ CA THIẾU NHI', desc: 'Cảm thụ tác phẩm văn học hay', icon: 'book', color: '#059669' }
            }
        },
        tienganh: {
            name: 'Môn Tiếng Anh',
            color: '#D97706',
            icon: 'cube',
            nodes: {
                'node-1': { title: 'ENGLISH ADVENTURE GRADE 5', desc: 'Fun & Interactive English Learning', icon: 'grad', color: '#D97706' },
                'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'grad', color: '#D97706' },
                'node-3': { title: 'VOCABULARY & GRAMMAR', desc: 'Daily activities and hobbies', icon: 'book', color: '#D97706' },
                'node-4': { title: 'ENGLISH WORD GAMES', desc: 'Spelling bee and picture quiz', icon: 'gamepad', color: '#D97706' },
                'node-5': { title: 'ENGLISH LISTENING & QUIZ', desc: 'Unit review test & Speaking', icon: 'quiz', color: '#D97706' },
                'node-6': { title: 'UNIT 1: MY FUTURE JOB', desc: 'What would you like to be?', icon: 'monitor', color: '#D97706' },
                'node-7': { title: 'UNIT 2: OUR SCHOOL TRIPS', desc: 'Talking about past experiences', icon: 'monitor', color: '#D97706' },
                'node-8': { title: 'UNIT 3: HEALTHY HABITS', desc: 'Giving health advice and rules', icon: 'monitor', color: '#D97706' }
            }
        },
        khoahoc: {
            name: 'Môn Khoa học',
            color: '#E11D48',
            icon: 'cube',
            nodes: {
                'node-1': { title: 'THẾ GIỚI KHOA HỌC TỰ NHIÊN', desc: 'Khám phá bí ẩn vũ trụ và sinh vật', icon: 'cube', color: '#E11D48' },
                'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: 'HS: Đào Thùy Anh - Lớp 5A', icon: 'grad', color: '#E11D48' },
                'node-3': { title: 'BÀI HỌC VẬT CHẤT & NĂNG LƯỢNG', desc: 'Điện năng, ánh sáng và nhiệt độ', icon: 'book', color: '#E11D48' },
                'node-4': { title: 'TRÒ CHƠI THÍ NGHIỆM VUI', desc: 'Mô phỏng thí nghiệm khoa học ảo', icon: 'gamepad', color: '#E11D48' },
                'node-5': { title: 'BÀI KIỂM TRA KHOA HỌC', desc: 'Khảo sát hiểu biết tự nhiên', icon: 'quiz', color: '#E11D48' },
                'node-6': { title: 'CON NGƯỜI VÀ SỨC KHỎE', desc: 'Dinh dưỡng và phòng tránh bệnh tật', icon: 'cube', color: '#E11D48' },
                'node-7': { title: 'THỰC VẬT VÀ ĐỘNG VẬT', desc: 'Sự sinh sản của các loài sinh vật', icon: 'cube', color: '#E11D48' },
                'node-8': { title: 'BẢO VỆ MÔI TRƯỜNG', desc: 'Tiết kiệm tài nguyên thiên nhiên', icon: 'cube', color: '#E11D48' }
            }
        }
    };

    function switchSubjectDiagram(subjectId, isManual = true) {
        currentSubjectId = subjectId;
        localStorage.setItem('current_diagram_subject', subjectId);
        if (subjectSelector) subjectSelector.value = subjectId;

        const tmpl = SUBJECT_TEMPLATES[subjectId] || SUBJECT_TEMPLATES['tinhoc'];
        const subColor = tmpl.color || '#7C3AED';

        if (subjectSelector) {
            subjectSelector.style.borderColor = subColor;
            subjectSelector.style.color = subColor;
        }

        // Check if custom node data exists for this subject in localStorage
        const customKey = `flowchart_nodes_data_${subjectId}`;
        const savedData = JSON.parse(localStorage.getItem(customKey) || 'null');
        const nodesSource = savedData || tmpl.nodes;

        document.querySelectorAll('.node').forEach(node => {
            const data = nodesSource[node.id] || tmpl.nodes[node.id];
            if (data) {
                const titleEl = node.querySelector('.node-title');
                const descEl = node.querySelector('.node-desc');
                if (titleEl && data.title) titleEl.textContent = data.title;
                if (descEl && data.desc) descEl.textContent = data.desc;
                applyNodeCustomStyles(node, data.icon || 'monitor', data.color || subColor, data.url || '');

                if (data.pos_x || data.pos_y) {
                    node.style.transform = `translate(${data.pos_x}px, ${data.pos_y}px)`;
                    node.dataset.x = data.pos_x;
                    node.dataset.y = data.pos_y;
                } else {
                    node.style.transform = '';
                    delete node.dataset.x;
                    delete node.dataset.y;
                }
            }
        });

        lines.forEach(line => {
            line.color = subColor;
            line.position();
        });

        updateStudentUI();
        renderChecklist();

        if (isManual) {
            showToast(`Đã chuyển sang sơ đồ: ${tmpl.name}!`, 'fa-folder-open', 'success');
            playClickSound();
        }
    }

    // Color selector for new subject
    document.querySelectorAll('#subjectColorSelector .color-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#subjectColorSelector .color-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSubjectColor = btn.dataset.color;
            playClickSound();
        });
    });

    subjectSelector?.addEventListener('change', (e) => {
        switchSubjectDiagram(e.target.value);
    });

    addSubjectBtn?.addEventListener('click', () => {
        if (newSubjectName) newSubjectName.value = '';
        if (newSubjectDesc) newSubjectDesc.value = '';
        subjectModal?.classList.add('active');
        newSubjectName?.focus();
    });

    subjectModalCloseBtn?.addEventListener('click', () => {
        subjectModal?.classList.remove('active');
    });

    subjectModalCancelBtn?.addEventListener('click', () => {
        subjectModal?.classList.remove('active');
    });

    saveNewSubjectBtn?.addEventListener('click', async () => {
        const name = newSubjectName ? newSubjectName.value.trim() : '';
        const desc = newSubjectDesc ? newSubjectDesc.value.trim() : '';

        if (!name) {
            alert('Vui lòng nhập tên môn học hoặc chủ đề!');
            return;
        }

        const newId = 'mon_' + Date.now();

        // Create new template
        SUBJECT_TEMPLATES[newId] = {
            name: name,
            color: selectedSubjectColor,
            icon: 'book',
            nodes: {
                'node-1': { title: `SƠ ĐỒ ${name.toUpperCase()}`, desc: desc || 'Cây sơ đồ kiến thức trọng tâm', icon: 'grad', color: selectedSubjectColor },
                'node-2': { title: 'NHẬP TÊN HS, LỚP', desc: `HS: ${currentStudent.name} - Lớp ${currentStudent.classroom}`, icon: 'grad', color: selectedSubjectColor },
                'node-3': { title: `BÀI HỌC ${name.toUpperCase()}`, desc: 'Chủ đề lý thuyết căn bản', icon: 'book', color: selectedSubjectColor },
                'node-4': { title: `TRÒ CHƠI ${name.toUpperCase()}`, desc: 'Trò chơi tương tác & giải đố', icon: 'gamepad', color: selectedSubjectColor },
                'node-5': { title: `BÀI KIỂM TRA ${name.toUpperCase()}`, desc: 'Đề ôn tập & khảo sát kiến thức', icon: 'quiz', color: selectedSubjectColor },
                'node-6': { title: `${name} - CHỦ ĐỀ 1`, desc: 'Kiến thức học kỳ I', icon: 'monitor', color: selectedSubjectColor },
                'node-7': { title: `${name} - CHỦ ĐỀ 2`, desc: 'Kiến thức học kỳ II', icon: 'monitor', color: selectedSubjectColor },
                'node-8': { title: `${name} - ÔN TẬP TỔNG HỢP`, desc: 'Đề thi cuối năm học', icon: 'monitor', color: selectedSubjectColor }
            }
        };

        // Add to select dropdown
        const opt = document.createElement('option');
        opt.value = newId;
        opt.textContent = `📚 ${name}`;
        subjectSelector?.appendChild(opt);

        // Sync to Supabase diagrams table
        if (supabaseClient) {
            try {
                await supabaseClient.from('diagrams').upsert({
                    id: newId,
                    subject_name: name,
                    description: desc,
                    color: selectedSubjectColor,
                    created_at: new Date().toISOString()
                });
            } catch (e) {}
        }

        subjectModal?.classList.remove('active');
        switchSubjectDiagram(newId);
        showToast(`Đã tạo thành công sơ đồ "${name}" và đồng bộ lên Supabase!`, 'fa-circle-check', 'success');
    });

    // Auto-init Subject
    if (currentSubjectId && SUBJECT_TEMPLATES[currentSubjectId]) {
        switchSubjectDiagram(currentSubjectId, false);
    }

    // --- Interactive Quiz & Assessment System (Supabase) ---
    const openQuizBtn = document.getElementById('openQuizBtn');
    const quizModal = document.getElementById('quizModal');
    const quizModalCloseBtn = document.getElementById('quizModalCloseBtn');
    const quizQuitBtn = document.getElementById('quizQuitBtn');
    const quizNextBtn = document.getElementById('quizNextBtn');
    const quizRetryBtn = document.getElementById('quizRetryBtn');
    const quizModalTitle = document.getElementById('quizModalTitle');
    const quizStepBadge = document.getElementById('quizStepBadge');
    const quizTimerText = document.getElementById('quizTimerText');
    const quizQuestionText = document.getElementById('quizQuestionText');
    const quizOptionsList = document.getElementById('quizOptionsList');
    const quizFeedbackBox = document.getElementById('quizFeedbackBox');
    const quizFeedbackText = document.getElementById('quizFeedbackText');
    const quizQuestionScreen = document.getElementById('quizQuestionScreen');
    const quizResultScreen = document.getElementById('quizResultScreen');
    const quizScorePercent = document.getElementById('quizScorePercent');
    const quizScoreLabel = document.getElementById('quizScoreLabel');
    const quizResultTitle = document.getElementById('quizResultTitle');
    const quizResultDesc = document.getElementById('quizResultDesc');
    const statCorrect = document.getElementById('statCorrect');
    const statTime = document.getElementById('statTime');
    const statPoints = document.getElementById('statPoints');
    const tabQuizLeaderboard = document.getElementById('tabQuizLeaderboard');
    const tabContentQuiz = document.getElementById('tabContentQuiz');
    const quizTableBody = document.getElementById('quizTableBody');
    const refreshQuizListBtn = document.getElementById('refreshQuizListBtn');

    const QUIZ_BANKS = {
        tinhoc: [
            {
                q: 'Trong phần mềm soạn thảo văn bản Word, tổ hợp phím nào dùng để LƯU tệp văn bản?',
                opts: ['Ctrl + C', 'Ctrl + S', 'Ctrl + V', 'Ctrl + P'],
                correct: 'B',
                exp: 'Phím tắt Ctrl + S (Save) dùng để lưu lại văn bản đang soạn thảo.'
            },
            {
                q: 'Thiết bị nào sau đây là THIẾT BỊ VÀO (Input Device) đưa dữ liệu vào máy tính?',
                opts: ['Màn hình hiển thị', 'Máy in màu', 'Bàn phím (Keyboard)', 'Loa máy tính'],
                correct: 'C',
                exp: 'Bàn phím và Chuột là các thiết bị vào cơ bản giúp con người nhập thông tin.'
            },
            {
                q: 'Để bảo vệ an toàn thông tin cá nhân trên mạng Internet, em nên làm gì?',
                opts: [
                    'Đặt mật khẩu đơn giản như 123456',
                    'Chia sẻ mật khẩu và tài khoản cho nhiều bạn bè',
                    'Đặt mật khẩu mạnh và không chia sẻ cho người lạ',
                    'Bấm vào mọi đường link lạ gửi qua tin nhắn'
                ],
                correct: 'C',
                exp: 'Mật khẩu mạnh và bảo mật thông tin cá nhân giúp tránh bị kẻ xấu đánh cắp tài khoản.'
            }
        ],
        toan: [
            {
                q: 'Kết quả của phép tính cộng số thập phân: 12,5 + 3,75 là:',
                opts: ['15,25', '16,25', '16,50', '15,75'],
                correct: 'B',
                exp: '12,5 + 3,75 = 16,25.'
            },
            {
                q: 'Công thức tính diện tích hình chữ nhật có chiều dài a và chiều rộng b là:',
                opts: ['S = (a + b) x 2', 'S = a x b', 'S = a x 4', 'S = a x a'],
                correct: 'B',
                exp: 'Diện tích hình chữ nhật bằng Chiều dài nhân Chiều rộng (S = a x b).'
            },
            {
                q: 'Một ô tô chạy trong 2 giờ được 90 km. Vận tốc trung bình của ô tô là:',
                opts: ['45 km/h', '40 km/h', '90 km/h', '180 km/h'],
                correct: 'A',
                exp: 'Vận tốc = Quãng đường : Thời gian = 90 : 2 = 45 km/h.'
            }
        ],
        tiengviet: [
            {
                q: 'Cặp từ nào sau đây là cặp TỪ ĐỒNG NGHĨA?',
                opts: ['Chăm chỉ - Siêng năng', 'Cao lớn - Thấp bé', 'Đen nhánh - Trắng tinh', 'Nhanh nhẹn - Chậm chạp'],
                correct: 'A',
                exp: 'Chăm chỉ và Siêng năng đều mang ý nghĩa cần cù, siêng năng lao động học tập.'
            },
            {
                q: 'Trong câu: "Em yêu quý mái trường thân yêu của em", từ nào là ĐẠI TỪ XƯNG HÔ?',
                opts: ['mái trường', 'Em', 'yêu quý', 'thân yêu'],
                correct: 'B',
                exp: '"Em" là đại từ dùng để xưng hô ngôi thứ nhất.'
            }
        ],
        tienganh: [
            {
                q: 'Choose the correct answer: "What would you like to be in the future?"',
                opts: ["I'd like to be a doctor.", "I like apples.", "She is reading a book.", "Yes, I can."],
                correct: 'A',
                exp: 'Câu hỏi hỏi về nghề nghiệp mong muốn trong tương lai -> I would like to be a...'
            },
            {
                q: 'Complete the sentence: "Yesterday, we ______ to the museum by bus."',
                opts: ['go', 'goes', 'went', 'going'],
                correct: 'C',
                exp: 'Yesterday là thì quá khứ đơn, động từ "go" chuyển thành "went".'
            }
        ],
        khoahoc: [
            {
                q: 'Chất khí nào cần thiết cho sự thở (hô hấp) của con người và sinh vật?',
                opts: ['Khí Ô-xi (O2)', 'Khí Ni-tơ (N2)', 'Khí Các-bô-níc (CO2)', 'Khí Hi-đrô (H2)'],
                correct: 'A',
                exp: 'Khí Ô-xi duy trì sự cháy và sự sống của mọi sinh vật.'
            },
            {
                q: 'Nguồn năng lượng nào sau đây là NĂNG LƯỢNG SẠCH có thể tái tạo?',
                opts: ['Than đá mỏ than', 'Năng lượng Mặt trời và Gió', 'Dầu mỏ khoáng sản', 'Khí đốt thiên nhiên'],
                correct: 'B',
                exp: 'Năng lượng mặt trời và gió là nguồn năng lượng tái tạo vô tận và không gây ô nhiễm.'
            }
        ]
    };

    let currentQuizQuestions = [];
    let currentQuizIndex = 0;
    let quizScoreCorrect = 0;
    let quizTimeStart = 0;
    let quizTimerTimer = null;
    let quizOptionSelected = false;

    function startQuiz(subjectId = currentSubjectId) {
        currentQuizQuestions = QUIZ_BANKS[subjectId] || QUIZ_BANKS['tinhoc'];
        currentQuizIndex = 0;
        quizScoreCorrect = 0;
        quizTimeStart = Date.now();

        const tmpl = SUBJECT_TEMPLATES[subjectId] || SUBJECT_TEMPLATES['tinhoc'];
        if (quizModalTitle) quizModalTitle.textContent = `Bài kiểm tra Trắc nghiệm ${tmpl.name}`;

        if (quizQuestionScreen) quizQuestionScreen.style.display = 'block';
        if (quizResultScreen) quizResultScreen.style.display = 'none';
        if (quizNextBtn) quizNextBtn.style.display = 'inline-flex';
        if (quizRetryBtn) quizRetryBtn.style.display = 'none';

        startQuizTimer();
        renderQuizStep();
        quizModal?.classList.add('active');
        playClickSound();
    }

    function startQuizTimer() {
        if (quizTimerTimer) clearInterval(quizTimerTimer);
        let seconds = 0;
        quizTimerTimer = setInterval(() => {
            seconds++;
            const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            if (quizTimerText) quizTimerText.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function stopQuizTimer() {
        if (quizTimerTimer) clearInterval(quizTimerTimer);
    }

    function renderQuizStep() {
        quizOptionSelected = false;
        const qData = currentQuizQuestions[currentQuizIndex];
        if (!qData) {
            finishQuiz();
            return;
        }

        if (quizStepBadge) quizStepBadge.textContent = `Câu ${currentQuizIndex + 1} / ${currentQuizQuestions.length}`;
        if (quizQuestionText) quizQuestionText.textContent = qData.q;
        if (quizFeedbackBox) quizFeedbackBox.style.display = 'none';

        if (quizOptionsList) {
            quizOptionsList.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];

            qData.opts.forEach((optText, idx) => {
                const letter = letters[idx];
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'quiz-option-btn';
                btn.dataset.letter = letter;
                btn.innerHTML = `
                    <span class="opt-prefix">${letter}</span>
                    <span class="opt-text">${optText}</span>
                `;

                btn.addEventListener('click', () => {
                    if (quizOptionSelected) return;
                    handleOptionClick(letter, btn, qData);
                });

                quizOptionsList.appendChild(btn);
            });
        }
    }

    function handleOptionClick(selectedLetter, clickedBtn, qData) {
        quizOptionSelected = true;
        const isCorrect = selectedLetter === qData.correct;

        if (isCorrect) {
            quizScoreCorrect++;
            clickedBtn.classList.add('correct');
            if (quizFeedbackBox) {
                quizFeedbackBox.className = 'quiz-feedback-box correct';
                quizFeedbackBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Chính xác!</strong> ${qData.exp}`;
                quizFeedbackBox.style.display = 'block';
            }
            showToast('Chính xác! +10 Điểm', 'fa-award', 'success');
        } else {
            clickedBtn.classList.add('wrong');
            // Highlight the correct option
            const correctBtn = quizOptionsList.querySelector(`[data-letter="${qData.correct}"]`);
            if (correctBtn) correctBtn.classList.add('correct');

            if (quizFeedbackBox) {
                quizFeedbackBox.className = 'quiz-feedback-box wrong';
                quizFeedbackBox.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Chưa chính xác!</strong> Đáp án đúng là <strong>${qData.correct}</strong>. ${qData.exp}`;
                quizFeedbackBox.style.display = 'block';
            }
            showToast('Tiếc quá! Đáp án đúng là ' + qData.correct, 'fa-circle-xmark', 'error');
        }
        playClickSound();
    }

    quizNextBtn?.addEventListener('click', () => {
        if (!quizOptionSelected) {
            alert('Em hãy chọn một đáp án trước khi qua câu tiếp theo nhé!');
            return;
        }

        currentQuizIndex++;
        if (currentQuizIndex < currentQuizQuestions.length) {
            renderQuizStep();
            playClickSound();
        } else {
            finishQuiz();
        }
    });

    async function finishQuiz() {
        stopQuizTimer();
        const total = currentQuizQuestions.length;
        const percent = Math.round((quizScoreCorrect / total) * 100);
        const timeElapsedSecs = Math.round((Date.now() - quizTimeStart) / 1000);
        const mins = String(Math.floor(timeElapsedSecs / 60)).padStart(2, '0');
        const secs = String(timeElapsedSecs % 60).padStart(2, '0');
        const timeStr = `${mins}:${secs}`;
        const points = quizScoreCorrect * 10;

        if (quizQuestionScreen) quizQuestionScreen.style.display = 'none';
        if (quizResultScreen) quizResultScreen.style.display = 'block';
        if (quizNextBtn) quizNextBtn.style.display = 'none';
        if (quizRetryBtn) quizRetryBtn.style.display = 'inline-flex';

        if (quizScorePercent) quizScorePercent.textContent = `${percent}%`;
        if (quizScoreLabel) quizScoreLabel.textContent = percent >= 80 ? 'Xuất sắc! 🌟' : (percent >= 50 ? 'Khá tốt! 👍' : 'Cố gắng lên! 📖');
        if (quizResultTitle) quizResultTitle.textContent = `Chúc mừng ${currentStudent.name}!`;
        if (quizResultDesc) quizResultDesc.textContent = `Em đã trả lời đúng ${quizScoreCorrect}/${total} câu hỏi trong bài thi trắc nghiệm.`;

        if (statCorrect) statCorrect.textContent = `${quizScoreCorrect}/${total}`;
        if (statTime) statTime.textContent = timeStr;
        if (statPoints) statPoints.textContent = `${points} Điểm`;

        showToast(`Hoàn thành bài kiểm tra: ${percent}% (${points} Điểm)!`, 'fa-trophy', 'success');

        // Automatically mark node-5 as completed in Student checklist
        if (!completedLessons.includes('node-5')) {
            completedLessons.push('node-5');
            localStorage.setItem('student_completed_lessons', JSON.stringify(completedLessons));
            updateStudentUI();
            renderChecklist();
        }

        // Sync result to Supabase Cloud student_quiz_results table
        if (supabaseClient) {
            try {
                await supabaseClient.from('student_quiz_results').insert({
                    student_name: currentStudent.name,
                    classroom: currentStudent.classroom,
                    subject_id: currentSubjectId,
                    score: points,
                    total_questions: total,
                    correct_count: quizScoreCorrect,
                    percentage: percent,
                    passed: percent >= 50,
                    completed_at: new Date().toISOString()
                });
                showToast('Đã lưu kết quả thi lên Supabase Cloud!', 'fa-cloud-arrow-up', 'success');
            } catch (err) {
                console.warn('Lỗi lưu điểm thi Supabase:', err);
            }
        }
    }

    quizRetryBtn?.addEventListener('click', () => {
        startQuiz(currentSubjectId);
    });

    quizQuitBtn?.addEventListener('click', () => {
        stopQuizTimer();
        quizModal?.classList.remove('active');
    });

    quizModalCloseBtn?.addEventListener('click', () => {
        stopQuizTimer();
        quizModal?.classList.remove('active');
    });

    openQuizBtn?.addEventListener('click', () => {
        startQuiz(currentSubjectId);
    });

    // Make Node-5 click/double click trigger the Quiz
    const node5El = document.getElementById('node-5');
    node5El?.addEventListener('click', (e) => {
        e.stopPropagation();
        startQuiz(currentSubjectId);
    });

    // Tab 3: Quiz Leaderboard Table
    tabQuizLeaderboard?.addEventListener('click', () => {
        tabCurrentStudent?.classList.remove('active');
        tabClassList?.classList.remove('active');
        tabQuizLeaderboard?.classList.add('active');

        if (tabContentCurrent) tabContentCurrent.style.display = 'none';
        if (tabContentClass) tabContentClass.style.display = 'none';
        if (tabContentQuiz) tabContentQuiz.style.display = 'block';

        fetchQuizLeaderboardFromSupabase();
        playClickSound();
    });

    refreshQuizListBtn?.addEventListener('click', () => {
        fetchQuizLeaderboardFromSupabase();
        playClickSound();
    });

    async function fetchQuizLeaderboardFromSupabase() {
        if (!quizTableBody) return;
        quizTableBody.innerHTML = '<tr><td colspan="6" class="table-loading" style="text-align:center; padding:20px; color:#64748B;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải bảng điểm từ Supabase...</td></tr>';

        if (!supabaseClient) {
            quizTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#EF4444;">Chưa kết nối Supabase Cloud.</td></tr>';
            return;
        }

        try {
            const { data, error } = await supabaseClient.from('student_quiz_results').select('*').order('score', { ascending: false }).limit(20);
            if (error) throw error;

            if (!data || data.length === 0) {
                quizTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:#64748B;">Chưa có học sinh nào làm bài thi trắc nghiệm. Hãy bấm "Trắc nghiệm Quiz" để làm bài đầu tiên!</td></tr>';
                return;
            }

            quizTableBody.innerHTML = '';
            data.forEach((r, idx) => {
                const subName = SUBJECT_TEMPLATES[r.subject_id]?.name || r.subject_id;
                const timeStr = r.completed_at ? new Date(r.completed_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : 'Vừa xong';
                const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-weight:700; font-size:14px;">${medal}</td>
                    <td style="font-weight:600; color:#1E293B;">${r.student_name} (${r.classroom || '5A'})</td>
                    <td><span class="badge-progress">${subName}</span></td>
                    <td style="font-weight:700; color:#2563EB;">${r.score} Điểm</td>
                    <td style="font-weight:600; color:${r.percentage >= 75 ? '#059669' : '#D97706'};">${r.percentage}% (${r.correct_count}/${r.total_questions})</td>
                    <td style="font-size:12px; color:#64748B;">${timeStr}</td>
                `;
                quizTableBody.appendChild(tr);
            });
        } catch (err) {
            console.error('Lỗi tải bảng điểm Quiz:', err);
            quizTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#EF4444;">Lỗi: ${err.message || 'Không thể truy vấn bảng student_quiz_results'}</td></tr>`;
        }
    }
});

