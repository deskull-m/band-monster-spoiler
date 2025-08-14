// Toast notification system
class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // DOM読み込み完了を待つ
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createContainer();
            });
        } else {
            this.createContainer();
        }
    }

    createContainer() {
        // トーストコンテナを作成
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        // コンテナが存在しない場合は作成
        if (!this.container || !document.body.contains(this.container)) {
            this.createContainer();
        }
        
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);

        // アニメーション開始
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // 自動削除
        if (duration > 0) {
            setTimeout(() => {
                this.hide(toast);
            }, duration);
        }

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ⓘ'
        };

        const titles = {
            success: '成功',
            error: 'エラー',
            warning: '警告',
            info: '情報'
        };

        toast.innerHTML = `
            <div class="toast-header">
                <span class="toast-icon">${icons[type] || icons.info}</span>
                ${titles[type] || titles.info}
                <button class="toast-close" onclick="toastManager.hide(this.closest('.toast'))">&times;</button>
            </div>
            <div class="toast-body">${message}</div>
        `;

        return toast;
    }

    hide(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // 便利メソッド
    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 6000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 5000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 4000) {
        return this.show(message, 'info', duration);
    }
}

// 確認ダイアログシステム
class ConfirmManager {
    constructor() {
        this.overlay = null;
    }

    show(message, title = '確認') {
        return new Promise((resolve) => {
            this.overlay = document.createElement('div');
            this.overlay.className = 'confirm-overlay';
            
            this.overlay.innerHTML = `
                <div class="confirm-dialog">
                    <div class="confirm-header">${title}</div>
                    <div class="confirm-body">${message}</div>
                    <div class="confirm-buttons">
                        <button class="confirm-btn secondary" data-result="false">キャンセル</button>
                        <button class="confirm-btn primary" data-result="true">OK</button>
                    </div>
                </div>
            `;

            // イベントリスナーを追加
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.hide();
                    resolve(false);
                }
            });

            this.overlay.querySelectorAll('.confirm-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const result = e.target.dataset.result === 'true';
                    this.hide();
                    resolve(result);
                });
            });

            document.body.appendChild(this.overlay);
            
            // アニメーション開始
            setTimeout(() => {
                this.overlay.classList.add('show');
            }, 10);
        });
    }

    hide() {
        if (this.overlay) {
            this.overlay.classList.remove('show');
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                this.overlay = null;
            }, 200);
        }
    }
}

// グローバルインスタンスを作成
const toastManager = new ToastManager();
const confirmManager = new ConfirmManager();

// alert, confirm の代替関数
window.showToast = (message, type = 'info', duration = 5000) => {
    return toastManager.show(message, type, duration);
};

window.showSuccess = (message, duration = 4000) => {
    return toastManager.success(message, duration);
};

window.showError = (message, duration = 6000) => {
    return toastManager.error(message, duration);
};

window.showWarning = (message, duration = 5000) => {
    return toastManager.warning(message, duration);
};

window.showInfo = (message, duration = 4000) => {
    return toastManager.info(message, duration);
};

window.showConfirm = (message, title = '確認') => {
    return confirmManager.show(message, title);
};

// 元のalert, confirmをオーバーライド（必要に応じて）
window.originalAlert = window.alert;
window.originalConfirm = window.confirm;

// alertをトーストに置き換える関数
window.replaceAlert = (message) => {
    toastManager.info(message);
};

// confirmをカスタムダイアログに置き換える関数
window.replaceConfirm = (message, title = '確認') => {
    return confirmManager.show(message, title);
};