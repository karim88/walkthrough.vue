import { App, createApp, reactive, UnwrapRef } from 'vue';
import WModal from "../components/WModal.vue";

export interface Step {
    element: string;
    content: string;
    callback?: () => void;
}

const Walkthrough = {
    install: (app: App) => {
        app.config.globalProperties.$walkthrough = Walkthrough;
    },

    state: reactive({
        element: 'body',
        isVisible: false,
        steps: 0,
        currentStep: 1,
        content: '',
        modalInstance: null as UnwrapRef<App<Element>> | null,
    }),

    init(steps: Step[]) {
        this.state.steps = steps.length;
        this.state.currentStep = 1;
        this.state.isVisible = true;
        this.renderModal(steps[this.state.currentStep - 1]);

        const nextStep = () => {
            if (this.state.currentStep < this.state.steps) {
                this.removePreviousStep()
                this.state.currentStep++;
                this.renderModal(steps[this.state.currentStep - 1]);
                this.mountModal({ nextStep, prevStep, closeModal });
                console.log('nextStep');
            }
        };

        const prevStep = () => {
            if (this.state.currentStep > 1) {
                this.removePreviousStep()
                this.state.currentStep--;
                this.renderModal(steps[this.state.currentStep - 1]);
                this.mountModal({ nextStep, prevStep, closeModal });
                console.log('prevStep');
            }
        };

        const closeModal = () => {
            this.state.isVisible = false;
            this.removePreviousStep()

        };

        this.mountModal({ nextStep, prevStep, closeModal });
    },

    updateProps(
        handlers: { nextStep: Function; prevStep: Function; closeModal: Function }
    ) {
        if (this.state.modalInstance) {
            this.state.modalInstance._props = {
                element: this.state.element,
                index: this.state.currentStep,
                stepsCount: this.state.steps,
                isVisible: this.state.isVisible,
                content: this.state.content,
                onNext: handlers.nextStep,
                onPrev: handlers.prevStep,
                onClose: handlers.closeModal,
            }
        }
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
        const selector = document.querySelector(this.state.element)!
        selector.classList.add('walkthrough-highlight');
        selector.appendChild(modalContainer);

        this.state.modalInstance = createApp(WModal, {
            element: this.state.element,
            index: this.state.currentStep,
            stepsCount: this.state.steps,
            isVisible: this.state.isVisible,
            content: this.state.content,
            onNext: handlers.nextStep,
            onPrev: handlers.prevStep,
            onClose: handlers.closeModal,
        });
        this.state.modalInstance.mount(modalContainer);
        this.positionModal(selector, document.querySelector('.walkthrough-modal')!);
    },
    positionModal(element: any, modal: HTMLElement) {
        const rect = element.getBoundingClientRect();
        const modalRect = modal.getBoundingClientRect();
        const margin = 10; // Margin to keep the modal a little inside the viewport

        // Calculate the default top position
        let top = rect.top - modalRect.height - margin;

        // If the modal is above the top of the viewport, place it below the element
        if (top < 0) {
            top = rect.bottom + margin;
        }

        // If the modal is still offscreen, adjust to fit within the viewport
        if (top + modalRect.height > window.innerHeight) {
            top = window.innerHeight - modalRect.height - margin;
        }

        // Calculate the default left position
        let left = rect.left + (rect.width / 2) - (modalRect.width / 2);

        // Ensure the modal doesn't go offscreen to the left
        if (left < margin) {
            left = margin;
        }

        // Ensure the modal doesn't go offscreen to the right
        if (left + modalRect.width > window.innerWidth) {
            left = window.innerWidth - modalRect.width - margin;
        }

        modal.style.top = `${top}px`;
        modal.style.left = `${left}px`;
    }
};

export default Walkthrough;
