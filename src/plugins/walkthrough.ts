import { App, computed, createApp, reactive, UnwrapRef, WritableComputedRef } from 'vue';
import WModal from "../components/WModal.vue";
import WTrigger from "../components/WTrigger.vue";

// Step options
export interface Step {
    element: string;
    title?: string;
    content: string;
    prevText?: string,
    nextText?: string,
    finishText?: string,
    nextCallback?: () => void;
    prevCallback?: () => void;
}
// Walkthrough options
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
        stepsCount: 0,
        steps: [] as Step[],
        step: {} as WritableComputedRef<Step>,
        index: 1,
        content: '',
        startText: 'Start',
        prevText: 'Previous',
        nextText: 'Next',
        finishText: 'Finish',
        modalInstance: null as UnwrapRef<App<Element>> | null,
    }),

    init(options: Options, steps: Step[]) {

        this.state.prevText = options.prevText ?? this.state.prevText;
        this.state.nextText = options.nextText ?? this.state.nextText;
        this.state.finishText = options.finishText ?? this.state.finishText;

        this.state.stepsCount = steps.length;
        this.state.steps = steps;
        this.state.index = 1;
        this.state.isVisible = true;

        const step = computed<Step>(() => steps[this.state.index - 1]);
        this.renderModal(step.value);

        const nextStep = () => {
            step.value.nextCallback?.()
            if (this.state.index < this.state.stepsCount) {
                this.removePreviousStep()
                this.state.index++;
                this.renderModal(step.value);
                this.mountModal({ nextStep, prevStep, closeModal });
            }
        };

        const prevStep = () => {
            if (this.state.index > 1) {
                step.value.prevCallback?.()
                this.removePreviousStep()
                this.state.index--;
                this.renderModal(step.value);
                this.mountModal({ nextStep, prevStep, closeModal });
            }
        };

        const closeModal = () => {
            this.state.isVisible = false;
            this.removePreviousStep()

        };

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
        if (!selector) {
            console.error(`Element not found: ${this.state.element}`);
            return;
        }
        selector.classList.add('walkthrough-highlight');
        selector.appendChild(modalContainer);
        const step = computed<Step>(() => this.state.steps[this.state.index - 1])


        this.state.modalInstance = createApp(WModal, {
            element: this.state.element,
            index: this.state.index,
            stepsCount: this.state.stepsCount,
            isVisible: this.state.isVisible,
            title: step.value.title ?? '',
            content: this.state.content,
            prevText: step.value.prevText ?? this.state.prevText,
            nextText: step.value.nextText ?? this.state.nextText,
            finishText: step.value.finishText ?? this.state.finishText,
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
