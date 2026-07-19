class Node {
    constructor(songTitle) {
        this.song = songTitle.trim() || "Untitled";
        this.prev = null;
        this.next = null;
    }
}

class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
        this.current = null;
        this.size = 0;
        this.playHistory = [];
        this.isShuffled = false;
        this.repeatMode = 'none';
        this.shuffleOrder = [];
    }

    add(songTitle) {
        const newNode = new Node(songTitle);
        if (!this.head) {
            this.head = newNode;
            this.head.next = this.head;
            this.head.prev = this.head;
            this.current = this.head;
        } else {
            const tail = this.head.prev;
            tail.next = newNode;
            newNode.prev = tail;
            newNode.next = this.head;
            this.head.prev = newNode;
        }
        this.size++;
        this.updateShuffleOrder();
        return newNode;
    }

    insertAfter(songTitle, refNode = null) {
        if (!this.head) return this.add(songTitle);
        const target = refNode || this.current || this.head;
        const newNode = new Node(songTitle);
        const nextNode = target.next;

        target.next = newNode;
        newNode.prev = target;
        newNode.next = nextNode;
        nextNode.prev = newNode;

        this.size++;
        this.updateShuffleOrder();
        return newNode;
    }

    insertBefore(songTitle, refNode = null) {
        if (!this.head) return this.add(songTitle);
        const target = refNode || this.current || this.head;
        const newNode = new Node(songTitle);
        const prevNode = target.prev;

        prevNode.next = newNode;
        newNode.prev = prevNode;
        newNode.next = target;
        target.prev = newNode;

        if (target === this.head) {
            this.head = newNode;
        }

        this.size++;
        this.updateShuffleOrder();
        return newNode;
    }

    deleteNode(node) {
        if (!node || this.size === 0) return null;
        if (this.size === 1) {
            this.head = null;
            this.current = null;
            this.size = 0;
            this.shuffleOrder = [];
            return null;
        }

        const prevNode = node.prev;
        const nextNode = node.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        if (node === this.head) {
            this.head = nextNode;
        }
        if (node === this.current) {
            this.current = nextNode;
        }

        this.size--;
        node.prev = null;
        node.next = null;
        this.updateShuffleOrder();
        return node;
    }

    deleteCurrent() {
        if (!this.current) return null;
        return this.deleteNode(this.current);
    }

    moveNext() {
        if (!this.current || this.size === 0) return null;
        
        if (this.repeatMode === 'one') {
            return this.current;
        }
        
        if (this.isShuffled) {
            return this.moveShuffled('next');
        }
        
        this.current = this.current.next;
        return this.current;
    }

    movePrev() {
        if (!this.current || this.size === 0) return null;
        
        if (this.isShuffled) {
            return this.moveShuffled('prev');
        }
        
        this.current = this.current.prev;
        return this.current;
    }

    moveShuffled(direction) {
        if (this.shuffleOrder.length === 0) return null;
        
        const currentIndex = this.shuffleOrder.indexOf(this.current);
        if (currentIndex === -1) {
            this.current = this.shuffleOrder[0];
            return this.current;
        }
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentIndex + 1) % this.shuffleOrder.length;
        } else {
            nextIndex = (currentIndex - 1 + this.shuffleOrder.length) % this.shuffleOrder.length;
        }
        
        this.current = this.shuffleOrder[nextIndex];
        return this.current;
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        if (this.isShuffled) {
            this.updateShuffleOrder();
        }
        return this.isShuffled;
    }

    updateShuffleOrder() {
        const nodes = this.toArray();
        this.shuffleOrder = nodes.slice();
        for (let i = this.shuffleOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shuffleOrder[i], this.shuffleOrder[j]] = [this.shuffleOrder[j], this.shuffleOrder[i]];
        }
        if (this.current && this.shuffleOrder.includes(this.current)) {
            const index = this.shuffleOrder.indexOf(this.current);
            [this.shuffleOrder[0], this.shuffleOrder[index]] = [this.shuffleOrder[index], this.shuffleOrder[0]];
        }
    }

    setRepeatMode(mode) {
        this.repeatMode = mode;
        return this.repeatMode;
    }

    cycleRepeatMode() {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(this.repeatMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        this.repeatMode = modes[nextIndex];
        return this.repeatMode;
    }

    clear() {
        this.head = null;
        this.current = null;
        this.size = 0;
        this.shuffleOrder = [];
        this.playHistory = [];
    }

    toArray() {
        if (!this.head) return [];
        const result = [];
        let current = this.head;
        do {
            result.push(current);
            current = current.next;
        } while (current !== this.head);
        return result;
    }

    getCurrentIndex() {
        if (!this.head || !this.current) return -1;
        let idx = 0;
        let temp = this.head;
        do {
            if (temp === this.current) return idx;
            temp = temp.next;
            idx++;
        } while (temp !== this.head);
        return -1;
    }

    getPositionString() {
        if (!this.current || this.size === 0) return '0/0';
        const idx = this.getCurrentIndex();
        return `${idx + 1}/${this.size}`;
    }

    getRepeatIcon() {
        switch(this.repeatMode) {
            case 'one': return '🔁 (1)';
            case 'all': return '🔁 (all)';
            default: return '🔂';
        }
    }
}