(() => {
    "use strict";
    window.NoticeSettings = {
        defaultLoadingType: "line",
        defaultLoadingColor: "#ffffff",
        defaultLoadingBgColor: "rgba(0,0,0,.6)",
        defaultToastDuration: 4000,
        defaultAutoClose: true,
        toastPosition: "top-right",
        enterAnimation: "fade",
        animationDuration: 500,
        offset: 5,
        colors: {
            success: {
                background: "rgba(166, 239, 184, 0.9)",
                text: "#333333",
                border: "rgba(166, 239, 184, 0.9)",
                borderWidth: "0px",
                borderRadius: "8px"
            },
            error: {
                background: "rgba(255, 175, 180, 0.9)",
                text: "#333333",
                border: "rgba(255, 175, 180, 0.9)",
                borderWidth: "0px",
                borderRadius: "8px"
            },
            warning: {
                background: "#FEEFB3",
                text: "#9F6000",
                border: "#9F600047",
                borderWidth: "1px",
                borderRadius: "8px"
            },
            info: {
                background: "#87daff",
                text: "#333333",
                border: "#87daff",
                borderWidth: "0px",
                borderRadius: "8px"
            }
        },
        
        updateSettings: function(newSettings) {
            if(newSettings.defaultLoadingType !== undefined) this.defaultLoadingType = newSettings.defaultLoadingType;
            if(newSettings.defaultToastDuration !== undefined) this.defaultToastDuration = newSettings.defaultToastDuration;
            if(newSettings.defaultLoadingColor !== undefined) this.defaultLoadingColor = newSettings.defaultLoadingColor;
            if(newSettings.defaultLoadingBgColor !== undefined) this.defaultLoadingBgColor = newSettings.defaultLoadingBgColor;
            if(newSettings.defaultAutoClose !== undefined) this.defaultAutoClose = newSettings.defaultAutoClose;
            if(newSettings.toastPosition !== undefined) this.toastPosition = newSettings.toastPosition;
            if(newSettings.enterAnimation !== undefined) this.enterAnimation = newSettings.enterAnimation;
            if(newSettings.animationDuration !== undefined) this.animationDuration = newSettings.animationDuration;
            if(newSettings.offset !== undefined) this.offset = newSettings.offset;
            if(newSettings.colors) {
                if(newSettings.colors.success) this.colors.success = {...this.colors.success, ...newSettings.colors.success};
                if(newSettings.colors.error) this.colors.error = {...this.colors.error, ...newSettings.colors.error};
                if(newSettings.colors.warning) this.colors.warning = {...this.colors.warning, ...newSettings.colors.warning};
                if(newSettings.colors.info) this.colors.info = {...this.colors.info, ...newSettings.colors.info};
            }
            this.applyPositionStyle();
            this.applyAnimationStyles();
        },
        
        applyPositionStyle: function() {
            let style = document.getElementById('notice-position-style');
            if(!style) {
                style = document.createElement('style');
                style.id = 'notice-position-style';
                document.head.appendChild(style);
            }
            const positions = {
                'top-left': { top: this.offset + 'px', left: this.offset + 'px', right: 'auto', bottom: 'auto' },
                'top-center': { top: this.offset + 'px', left: '50%', right: 'auto', bottom: 'auto', transform: 'translateX(-50%)' },
                'top-right': { top: this.offset + 'px', right: this.offset + 'px', left: 'auto', bottom: 'auto' },
                'center-left': { top: '50%', left: this.offset + 'px', right: 'auto', bottom: 'auto', transform: 'translateY(-50%)' },
                'center': { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)' },
                'center-right': { top: '50%', right: this.offset + 'px', left: 'auto', bottom: 'auto', transform: 'translateY(-50%)' },
                'bottom-left': { bottom: this.offset + 'px', left: this.offset + 'px', right: 'auto', top: 'auto' },
                'bottom-center': { bottom: this.offset + 'px', left: '50%', right: 'auto', top: 'auto', transform: 'translateX(-50%)' },
                'bottom-right': { bottom: this.offset + 'px', right: this.offset + 'px', left: 'auto', top: 'auto' }
            };
            const pos = positions[this.toastPosition] || positions['top-right'];
            let css = `.notice-toast { position: fixed; z-index: 99999999999; margin: 0; `;
            for(let key in pos) css += `${key}: ${pos[key]}; `;
            css += ` }`;
            style.innerHTML = css;
        },
        
        applyAnimationStyles: function() {
            let style = document.getElementById('notice-animation-style');
            if(!style) {
                style = document.createElement('style');
                style.id = 'notice-animation-style';
                document.head.appendChild(style);
            }
            const animations = {
                fade: { enter: `@keyframes noticeEnter { from { opacity: 0; } to { opacity: 1; } }`, exit: `@keyframes noticeExit { from { opacity: 1; } to { opacity: 0; } }` },
                slideFromRight: { enter: `@keyframes noticeEnter { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`, exit: `@keyframes noticeExit { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }` },
                slideFromLeft: { enter: `@keyframes noticeEnter { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`, exit: `@keyframes noticeExit { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }` },
                slideFromTop: { enter: `@keyframes noticeEnter { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`, exit: `@keyframes noticeExit { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }` },
                slideFromBottom: { enter: `@keyframes noticeEnter { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`, exit: `@keyframes noticeExit { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }` },
                bounce: { enter: `@keyframes noticeEnter { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }`, exit: `@keyframes noticeExit { from { transform: scale(1); opacity: 1; } to { transform: scale(0); opacity: 0; } }` },
                zoom: { enter: `@keyframes noticeEnter { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`, exit: `@keyframes noticeExit { from { transform: scale(1); opacity: 1; } to { transform: scale(0); opacity: 0; } }` }
            };
            const anim = animations[this.enterAnimation] || animations.slideFromRight;
            const duration = this.animationDuration;
            const css = `${anim.enter} ${anim.exit} .notice_toast_main { animation: noticeEnter ${duration}ms ease forwards !important; } .notice_toast_main_exit { animation: noticeExit ${duration}ms ease forwards !important; }`;
            style.innerHTML = css;
        }
    };
    
    window.NoticeSettings.applyPositionStyle();
    window.NoticeSettings.applyAnimationStyles();

    function o(o, n) {
        return "string" == typeof o ? (n || document).querySelector(o) : o || null
    }

    function n(o, { color: n, icon: e, showClose: t, text: c }, i) {
        return ` <div class="notice_toast_container">\n                    ${e?`<i class="notice-iconfont notice_toast_icon ${n}">${e}</i>`:""}\n                    <div class="notice_toast_text ${n} ${i&&!e?"notice_toast_truncate_second":""}" style="color: ${n}; max-width: ${t?"calc(80vw - 29px)":"calc(80vw - 29px)"};">${c} \n                </div>\n                ${t?`<i class="notice-iconfont notice-close-icon"\n                       onclick="\n                            document.getElementById('${o}').classList.add('notice_toast_main_exit');\n                            setTimeout(() => document.getElementById('${o}').remove(), ${window.NoticeSettings.animationDuration});">\n                        <svg version="1.1" width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.88 22.88" xml:space="preserve"><path d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"></path></svg>\n                    </i>`:""}`
    }
    
    window.Notice = class {
        showLoading(n) {
            ("object" != typeof n || null === n) && (n = {});
            const e = n.type || window.NoticeSettings.defaultLoadingType;
            const t = n.color || window.NoticeSettings.defaultLoadingColor;
            const c = n.backgroundColor || window.NoticeSettings.defaultLoadingBgColor;
            const i = n.title || "";
            const s = Number(n.fontSize) ? Number(n.fontSize) : 16;
            const l = document.createElement("div");
            l.setAttribute("class", "notice-loading notice-flex-center notice-fixed-all-page");
            l.setAttribute("id", "notice-loading");
            const d = function(o, n) {
                switch (o) {
                    case "cube_flip":
                        return `<div class="notice-loading-cube-flip" style="background-color: ${n}"></div>`;
                    case "dots_zoom":
                        return `<div class="notice-loading-dots-zoom">\n                        <div class="notice-loading-dots-zoom1" style="background-color: ${n}"></div>\n                        <div class="notice-loading-dots-zoom2" style="background-color: ${n}"></div>\n                    </div>`;
                    case "line":
                        return `<div class="notice-loading-line">\n                      <div class="notice-loading-line-rect1" style="background-color: ${n}"></div>\n                      <div class="notice-loading-line-rect2" style="background-color: ${n}"></div>\n                      <div class="notice-loading-line-rect3" style="background-color: ${n}"></div>\n                      <div class="notice-loading-line-rect4" style="background-color: ${n}"></div>\n                      <div class="notice-loading-line-rect5" style="background-color: ${n}"></div>\n                    </div>`;
                    case "dots_spin":
                        return `<div class="notice-loading-spin-dots">\n                      <div class="notice-loading-spin-dot1" style="background-color: ${n}"></div>\n                      <div class="notice-loading-spin-dot2" style="background-color: ${n}"></div>\n                    </div>`;
                    case "dots":
                        return `<div class="notice-loading-dots">\n                      <div class="notice-loading-dot1" style="background-color: ${n}"></div>\n                      <div class="notice-loading-dot2" style="background-color: ${n}"></div>\n                      <div style="background-color: ${n}"></div>\n                    </div>`;
                    case "cube_zoom":
                        return `<div class="notice-loading-cube-zoom">\n                      <div class="notice-loading-cube-zoom-1" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-2" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-3" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-4" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-5" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-6" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-7" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-8" style="background-color: ${n}"></div>\n                      <div class="notice-loading-cube-zoom-9" style="background-color: ${n}"></div>\n                    </div>`
                }
            }(e, t);
            l.innerHTML = `\n                <div class="notice-mask notice-fixed-all-page" style="background-color: ${c}"><div style="position:absolute;top:30px;right:30px;cursor:pointer;" onclick="new Notice().hideLoading()"><svg fill="#DDD" version="1.1" width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.88 22.88" xml:space="preserve"><path d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"></path></svg></div></div>\n                <div class="notice-flex-center notice-loading-main">\n                ${d}\n                    ${i?`<p style="color:${t};font-size: ${s+"px"};">${i}</div>`:""}\n                </div>\n            `;
            o("body").appendChild(l)
        }
        
		hideLoading() {
			const n = o("#notice-loading");
			if (n && n.parentNode) {
				n.style.transition = "opacity .4s ease";
				n.style.opacity = "0";
				setTimeout(() => {
					if (n && n.parentNode) n.parentNode.removeChild(n);
				}, 400);
			}
		}
        
        showToast(e) {
            ("object" != typeof e || null === e) && (e = {});
            const t = e.text;
            if (!t) return;
            const c = screen.width < 576;
            const colors = window.NoticeSettings.colors;
            const i = {
                default: { icon: "", phoneIcon: "", color: "#909399", backgroundColor: "#f4f4f5", border: "transparent", borderWidth: "0px", borderRadius: "8px" },
                success: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"> <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/> </svg>`, phoneIcon: "&#xe600;", color: colors.success.text, backgroundColor: colors.success.background, border: colors.success.border, borderWidth: colors.success.borderWidth, borderRadius: colors.success.borderRadius },
                error: { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>`, phoneIcon: "&#xe640;", color: colors.error.text, backgroundColor: colors.error.background, border: colors.error.border, borderWidth: colors.error.borderWidth, borderRadius: colors.error.borderRadius },
                info: { icon: "&#xe89e;", phoneIcon: "&#xea11;", color: colors.info.text, backgroundColor: colors.info.background, border: colors.info.border, borderWidth: colors.info.borderWidth, borderRadius: colors.info.borderRadius },
                warning: { icon: "&#xe65b;", phoneIcon: "&#xea0c;", color: colors.warning.text, backgroundColor: colors.warning.background, border: colors.warning.border, borderWidth: colors.warning.borderWidth, borderRadius: colors.warning.borderRadius }
            };
            let s = i[e.type || "default"] || i.default;
            c && (s.icon = s.phoneIcon);
            let l = e.autoClose !== undefined ? e.autoClose : window.NoticeSettings.defaultAutoClose;
            s.showClose = e.showClose || !1;
            s.text = t;
            const d = "notice_toast_" + Number(Math.random().toString().substr(3, 4) + Date.now()).toString(36);
            
            if (c && (s.icon = s.phoneIcon, l = !0, o("#notice-toast") && o("#notice-toast").remove()), o("#notice-toast")) {
                const e = document.createElement("div");
                e.setAttribute("class", "notice_toast_main " + s.backgroundColor);
                e.setAttribute("id", d);
                e.setAttribute("style", `background: ${s.backgroundColor}; border: ${s.borderWidth} solid ${s.border}; border-radius: ${s.borderRadius};`);
                e.innerHTML = n(d, s, c);
                o("#notice-toast").appendChild(e)
            } else {
                const e = document.createElement("div");
                e.setAttribute("class", "notice-toast");
                e.setAttribute("id", "notice-toast");
                e.innerHTML = ` <div class="notice_toast_main" id="${d}" style="background: ${s.backgroundColor}; border: ${s.borderWidth} solid ${s.border}; border-radius: ${s.borderRadius};" >\n                    ${n(d,s,c)}\n                </div> `;
                o("body").appendChild(e)
            }
            const T = o(`#${d}`);
            const D = Number(e.duration) || window.NoticeSettings.defaultToastDuration;
            setTimeout(() => T && T.classList.add("notice_toast_main_active"), 10);
            if (l) {
                const closeIt = () => {
                    if (!T.isConnected) return;
                    T.classList.add("notice_toast_main_exit");
                    setTimeout(() => T.remove(), window.NoticeSettings.animationDuration);
                };
                const bar = document.createElement("div");
                bar.className = "notice_toast_bar";
                bar.style.transformOrigin = getComputedStyle(T).direction === "rtl" ? "right" : "left";
                T.appendChild(bar);
                const anim = bar.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], { duration: D, easing: "linear", fill: "forwards" });
                anim.onfinish = closeIt;
                T.addEventListener("pointerenter", () => anim.pause());
                T.addEventListener("pointerleave", () => anim.play());
            }
        }
    }
})();

function Hide_Loading() 
{
	var notic = document.getElementById("notice-loading");
	document.body.removeChild(notic)
}

const notice = new Notice();