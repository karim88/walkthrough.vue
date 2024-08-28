import {App, computed, createApp, reactive, UnwrapRef} from 'vue';
import WModal from "../components/WModal.vue";
import WTrigger from "../components/WTrigger.vue";

export interface Step {
    element: string;
    content: string;
    callback?: () => void;
}
export interface Options {
    prevText?: string,
    nextText?: string,
    finishText?: string,
}

const Walkthrough = {
    install: (app: App) => {
        app.config.globalProperties.$walkthrough = Walkthrough;
        app.component('WTriggerButton', WTrigger);
    },

    state: reactive({
        element: 'body',
        isVisible: false,
        steps: 0,
        currentStep: 1,
        content: '',
        startText: 'Start',
        prevText: 'Previous',
        nextText: 'Next',
        finishText: 'Finish',
        modalInstance: null as UnwrapRef<App<Element>> | null,
    }),

    init(options: Options,steps: Step[]) {

        if (options.prevText) {
            this.state.prevText = options.prevText;
        }
        if (options.nextText) {
            this.state.nextText = options.nextText;
        }
        if (options.finishText) {
            this.state.finishText = options.finishText;
        }
        this.state.steps = steps.length;
        this.state.currentStep = 1;
        this.state.isVisible = true;
        const step = computed<Step>( () => steps[this.state.currentStep - 1])
        this.renderModal(step.value);

        const nextStep = () => {
            if (this.state.currentStep < this.state.steps) {
                this.removePreviousStep()
                this.state.currentStep++;
                this.renderModal(step.value);
                this.mountModal({ nextStep, prevStep, closeModal });
            }
        };

        const prevStep = () => {
            if (this.state.currentStep > 1) {
                this.removePreviousStep()
                this.state.currentStep--;
                this.renderModal(step.value);
                this.mountModal({ nextStep, prevStep, closeModal });
            }
        };

        const closeModal = () => {
            this.state.isVisible = false;
            this.removePreviousStep()

        };

        step.value.callback?.()
        this.mountModal({ nextStep, prevStep, closeModal });
    },

    renderModal(step: Step) {
        this.state.content = step.content;
        this.state.element = step.element;
    },
    removePreviousStep() {
        if (this.state.modalInstance) {
            this.state.modalInstance.unmount();
            this.state.modalInstance = null;
            document.querySelector('.walkthrough-modal-container')!?.remove();
            document.querySelector('.walkthrough-highlight')!?.classList.remove('walkthrough-highlight')
        }
    },

    mountModal(handlers: { nextStep: Function, prevStep: Function, closeModal: Function }) {
        this.removePreviousStep()
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('walkthrough-modal-container');
        modalContainer.style.position = 'absolute';
        modalContainer.style.top = '0';
        const selector = document.querySelector(this.state.element)!
        selector.classList.add('walkthrough-highlight');
        selector.appendChild(modalContainer);

        this.state.modalInstance = createApp(WModal, {
            element: this.state.element,
            index: this.state.currentStep,
            stepsCount: this.state.steps,
            isVisible: this.state.isVisible,
            content: this.state.content,
            prevText: this.state.prevText,
            nextText: this.state.nextText,
            finishText: this.state.finishText,
            onNext: handlers.nextStep,
            onPrev: handlers.prevStep,
            onClose: handlers.closeModal,
        });

        this.state.modalInstance.mount(modalContainer);
        this.positionModal(selector, document.querySelector('.walkthrough-modal')!);
    },
    adjustModalArrow(top: number) {
        const arrow = document.querySelector('.arrow')!
        const inner = document.querySelector('.inner')!
        if (top < 0) {
            arrow.classList.remove('arrow-bottom')
            arrow.classList.add('arrow-top')
            inner.classList.remove('inner-bottom')
            inner.classList.add('inner-top')
        } else {
            arrow.classList.remove('arrow-top')
            arrow.classList.add('arrow-bottom')
            inner.classList.remove('inner-top')
            inner.classList.add('inner-bottom')
        }
    },
    positionModal(element: any, modal: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const modalRect = modal.getBoundingClientRect();
        const margin = 10; // Margin to keep the modal a little inside the viewport

        // Calculate the default top position
        let top = rect.top - modalRect.height - margin;

        // Adjusting the arrow in top or bottom of the modal
        this.adjustModalArrow(top)

        // If the modal is above the top of the viewport, place it below the element
        if (top < 0) {
            top = rect.bottom + margin;
        }

        // If the modal is still offscreen, adjust to fit within the viewport
        if (top + modalRect.height > window.innerHeight) {
            top = window.innerHeight - modalRect.height - margin;
        }

        // Calculate the default left position
        let left = rect.left - rect.width - margin;

        // Ensure the modal doesn't go offscreen to the left
        if (left < margin) {
            left = margin;
        }

        // Ensure the modal doesn't go offscreen to the right
        if (left + modalRect.width > window.innerWidth) {
            left = window.innerWidth - modalRect.width;
        }

        modal.style.top = `${top}px`;
        modal.style.left = `${left}px`;
    }
};

export default Walkthrough;
