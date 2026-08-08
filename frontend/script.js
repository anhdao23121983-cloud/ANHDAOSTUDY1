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
});
