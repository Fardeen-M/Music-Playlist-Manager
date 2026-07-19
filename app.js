document.addEventListener('DOMContentLoaded', function() {
    const playlist = new CircularDoublyLinkedList();

    const container = document.getElementById('playlistContainer');
    const trackCountSpan = document.getElementById('trackCount');
    const currentBadge = document.getElementById('currentTrackBadge');
    const currentSongDisplay = document.getElementById('currentSongDisplay');
    const songInput = document.getElementById('songInput');

    const addBtn = document.getElementById('addSongBtn');
    const insertAfterBtn = document.getElementById('insertAfterBtn');
    const insertBeforeBtn = document.getElementById('insertBeforeBtn');
    const deleteCurrentBtn = document.getElementById('deleteCurrentBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const playBtn = document.getElementById('playBtn');

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getReferenceNode() {
        if (playlist.current) return playlist.current;
        if (playlist.head) return playlist.head;
        return null;
    }

    function updatePlayerControls() {
        if (shuffleBtn) {
            shuffleBtn.classList.toggle('active', playlist.isShuffled);
            shuffleBtn.innerHTML = playlist.isShuffled ? 
                '<i class="fas fa-random" style="color:#a78bfa;"></i> Shuffle ON' : 
                '<i class="fas fa-random"></i> Shuffle';
        }

        if (repeatBtn) {
            const icons = {
                'none': '<i class="fas fa-repeat"></i> Repeat',
                'one': '<i class="fas fa-repeat-1" style="color:#a78bfa;"></i> Repeat 1',
                'all': '<i class="fas fa-repeat" style="color:#a78bfa;"></i> Repeat All'
            };
            repeatBtn.innerHTML = icons[playlist.repeatMode] || icons['none'];
            repeatBtn.classList.toggle('active', playlist.repeatMode !== 'none');
        }

        if (playBtn && playlist.current) {
            playBtn.innerHTML = `<i class="fas fa-play"></i> ${escapeHtml(playlist.current.song)}`;
        } else if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-play"></i> No song';
        }

        if (currentSongDisplay && playlist.current) {
            currentSongDisplay.textContent = `▶ ${escapeHtml(playlist.current.song)}`;
        } else if (currentSongDisplay) {
            currentSongDisplay.textContent = '⏸ No song playing';
        }
    }

    function render() {
        const nodes = playlist.toArray();
        const count = playlist.size;

        trackCountSpan.textContent = `${count} song${count !== 1 ? 's' : ''}`;

        if (playlist.current) {
            const pos = playlist.getPositionString();
            currentBadge.textContent = `▶ ${pos}`;
        } else {
            currentBadge.textContent = `⚡ none`;
        }

        if (count === 0) {
            container.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-music"></i><br />
                    no tracks yet · add a song
                </div>
            `;
            updatePlayerControls();
            return;
        }

        let html = '';
        nodes.forEach((node, index) => {
            const isCurrent = (node === playlist.current);
            const activeClass = isCurrent ? 'highlight' : '';
            const icon = isCurrent ? '<i class="fas fa-play" style="color:#a78bfa; margin-right:6px;"></i>' : '';

            html += `
                <div class="song-item ${activeClass}" data-index="${index}">
                    <div class="song-info">
                        <span class="song-index">${index+1}</span>
                        <span class="song-title">${icon} ${escapeHtml(node.song)}</span>
                    </div>
                    <div class="song-actions">
                        <button class="btn set-current-btn" data-index="${index}" title="Set as current"><i class="fas fa-bullseye"></i></button>
                        <button class="btn delete-node-btn" data-index="${index}" title="Delete"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        document.querySelectorAll('.set-current-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const idx = parseInt(this.dataset.index, 10);
                const arr = playlist.toArray();
                if (arr[idx]) {
                    playlist.current = arr[idx];
                    render();
                }
            });
        });

        document.querySelectorAll('.delete-node-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const idx = parseInt(this.dataset.index, 10);
                const arr = playlist.toArray();
                if (arr[idx]) {
                    playlist.deleteNode(arr[idx]);
                    render();
                }
            });
        });

        updatePlayerControls();
    }

    function addSong() {
        const title = songInput.value.trim();
        if (!title) {
            alert('Please enter a song title.');
            return;
        }
        playlist.add(title);
        songInput.value = '';
        render();
    }

    function insertAfter() {
        const title = songInput.value.trim();
        if (!title) {
            alert('Enter a song title to insert.');
            return;
        }
        const ref = getReferenceNode();
        if (!ref) {
            playlist.add(title);
        } else {
            playlist.insertAfter(title, ref);
        }
        songInput.value = '';
        render();
    }

    function insertBefore() {
        const title = songInput.value.trim();
        if (!title) {
            alert('Enter a song title to insert.');
            return;
        }
        const ref = getReferenceNode();
        if (!ref) {
            playlist.add(title);
        } else {
            playlist.insertBefore(title, ref);
        }
        songInput.value = '';
        render();
    }

    function deleteCurrent() {
        if (!playlist.current) {
            alert('No current track selected.');
            return;
        }
        playlist.deleteCurrent();
        render();
    }

    function clearAll() {
        if (playlist.size === 0) return;
        if (confirm('Delete all tracks?')) {
            playlist.clear();
            render();
        }
    }

    function movePrev() {
        if (playlist.size === 0) return;
        playlist.movePrev();
        render();
    }

    function moveNext() {
        if (playlist.size === 0) return;
        playlist.moveNext();
        render();
    }

    function toggleShuffle() {
        if (playlist.size === 0) return;
        playlist.toggleShuffle();
        render();
    }

    function cycleRepeat() {
        if (playlist.size === 0) return;
        playlist.cycleRepeatMode();
        render();
    }

    function playPause() {
        if (playlist.current) {
            render();
        }
    }

    addBtn.addEventListener('click', addSong);
    insertAfterBtn.addEventListener('click', insertAfter);
    insertBeforeBtn.addEventListener('click', insertBefore);
    deleteCurrentBtn.addEventListener('click', deleteCurrent);
    clearAllBtn.addEventListener('click', clearAll);
    prevBtn.addEventListener('click', movePrev);
    nextBtn.addEventListener('click', moveNext);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', cycleRepeat);
    playBtn.addEventListener('click', playPause);

    songInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSong();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            movePrev();
        }
        if (e.altKey && e.key === 'ArrowRight') {
            e.preventDefault();
            moveNext();
        }
        if (e.altKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            toggleShuffle();
        }
        if (e.altKey && (e.key === 'r' || e.key === 'R')) {
            e.preventDefault();
            cycleRepeat();
        }
    });

    playlist.add('Bohemian Rhapsody');
    playlist.add('Stairway to Heaven');
    playlist.add('Smells Like Teen Spirit');
    playlist.add('Hotel California');
    playlist.add('Imagine');
    playlist.current = playlist.head;
    render();

    console.log('🎵 Music Player with Circular Playlist ready!');
    console.log('Keyboard shortcuts: Alt+←/→ (prev/next), Alt+S (shuffle), Alt+R (repeat)');
    console.log(playlist);
});