import { defineStore } from "pinia";
import { useSound } from "~/composables/useSound";

export const useWindowsStore = defineStore("windows", {
  state: () => ({
    activeWindow: "",
    activeWindows: [],
    zIndex: 2,
    windows: [
      {
        windowId: "AboutApp",
        windowState: "close",
        displayName: "About Me",
        windowComponent: "window",
        windowContent: "about",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "5vw",
        positionY: "5%",
        iconImage: "bio.png",
        altText: "About Me",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ResumeViewer",
        windowState: "close",
        displayName: "Resume",
        windowComponent: "window",
        windowContent: "resume",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "10vw",
        positionY: "15vh",
        iconImage: "resume.png",
        altText: "Resume",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ProjectsExplorer",
        windowState: "close",
        displayName: "Projects",
        windowComponent: "ExplorerWindow",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "10vw",
        positionY: "5vh",
        iconImage: "folder.png",
        altText: "Projects",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        explorerDataSource: "projects",
      },
      {
        windowId: "GamesExplorer",
        windowState: "close",
        displayName: "Games",
        windowComponent: "ExplorerWindow",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "12vw",
        positionY: "7vh",
        iconImage: "games.png",
        altText: "Games",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        explorerDataSource: "games",
      },
      {
        windowId: "ExperimentsExplorer",
        windowState: "close",
        displayName: "Experiments",
        windowComponent: "ExplorerWindow",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "14vw",
        positionY: "9vh",
        iconImage: "experiments.png",
        altText: "Experiments",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        explorerDataSource: "experiments",
      },
      {
        windowId: "ContactApp",
        windowState: "close",
        displayName: "Contact",
        windowComponent: "window",
        windowContent: "contact",
        windowContentPadding: {
          top: "10px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        },
        position: "absolute",
        positionX: "16vw",
        positionY: "8vh",
        iconImage: "mail.png",
        altText: "Contact",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "TerminalApp",
        windowState: "close",
        displayName: "Terminal",
        windowComponent: "TerminalWindow",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "18vw",
        positionY: "10vh",
        iconImage: "terminal.png",
        altText: "Terminal",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "CaseStudyReader",
        windowState: "close",
        displayName: "Case Study",
        windowComponent: "window",
        windowContent: "casestudy",
        windowContentPadding: {
          top: "15px",
          right: "15px",
          bottom: "15px",
          left: "15px",
        },
        position: "absolute",
        positionX: "12vw",
        positionY: "6vh",
        iconImage: "file.png",
        altText: "Case Study",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: true,
        caseStudySlug: null,
      },
    ],
  }),

  getters: {
    getFullscreenWindowHeight() {
      let height = "0px";
      if (typeof window !== "undefined") {
        height = window.innerHeight + "px";
      }
      return height;
    },
  },

  actions: {
    getWindowById(windowId) {
      return this.windows.find((window) => window.windowId === windowId);
    },

    getWindowFullscreen(windowId) {
      return this.windows.find((window) => window.windowId === windowId)
        .fullscreen;
    },

    getActiveWindow() {
      return this.activeWindow;
    },

    setActiveWindow(windowId) {
      this.activeWindow = windowId;
    },

    setFullscreen(payload) {
      const window = this.windows.find(
        (w) => w.windowId === payload.windowId
      );
      window.fullscreen = payload.fullscreen;
    },

    zIndexIncrement(windowId) {
      this.zIndex++;
      if (document.getElementById(windowId)) {
        document.getElementById(windowId).style.zIndex = this.zIndex;
      }
    },

    pushActiveWindow(window) {
      this.activeWindows.push(window);
    },

    popActiveWindow(window) {
      const windowIndex = this.activeWindows.indexOf(window);
      if (windowIndex !== -1) {
        this.activeWindows.splice(windowIndex, 1);
      }
    },

    pushNewWindow(window) {
      this.windows.push(window);
    },

    setWindowState(payload) {
      const { playSound } = useSound();
      const window = this.windows.find(
        (w) => w.windowId === payload.windowId
      );

      let preventAppendingOpenWindow = false;
      if (
        window.windowState == "open" ||
        window.windowState == "minimize"
      ) {
        preventAppendingOpenWindow = true;
      }

      if (payload.windowState == "open") {
        playSound('open');
        window.windowState = payload.windowState;
        setTimeout(() => {
          this.zIndexIncrement(payload.windowId);
        }, 0);
        setTimeout(() => {
          this.setActiveWindow(payload.windowId);
        }, 0);
        if (preventAppendingOpenWindow == false) {
          this.pushActiveWindow(window);
        }
      } else if (payload.windowState == "close") {
        playSound('close');
        setTimeout(() => {
          window.windowState = payload.windowState;
        }, 0);
        setTimeout(() => {
          this.popActiveWindow(window);
        }, 0);
        setTimeout(() => {
          this.setActiveWindow("nil");
        }, 0);
      } else if (payload.windowState == "minimize") {
        playSound('minimize');
        setTimeout(() => {
          window.windowState = payload.windowState;
        }, 0);
        setTimeout(() => {
          this.setActiveWindow("nil");
        }, 0);
      }
    },

    openCaseStudy(slug, displayName) {
      const reader = this.windows.find(
        (w) => w.windowId === "CaseStudyReader"
      );
      if (reader) {
        reader.displayName = displayName;
        reader.caseStudySlug = slug;
        this.setWindowState({
          windowId: "CaseStudyReader",
          windowState: "open",
        });
      }
    },

    openIframeWindow(url, displayName, iconImage) {
      const windowId = "IframeWindow-" + Date.now();
      const iframeWindow = {
        windowId: windowId,
        windowState: "close",
        displayName: displayName,
        windowComponent: "IframeWindow",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: Math.floor(Math.random() * 10 + 5) + "vw",
        positionY: Math.floor(Math.random() * 10 + 5) + "vh",
        iconImage: iconImage || "file.png",
        altText: displayName,
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: true,
        iframeUrl: url,
      };
      this.pushNewWindow(iframeWindow);
      this.setWindowState({ windowId: windowId, windowState: "open" });
    },
  },
});
