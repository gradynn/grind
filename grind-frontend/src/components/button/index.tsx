interface ButtonProps {
    text: string;
    onClick: () => void;
    type: 'primary' | 'secondary' | 'invisible';
    submit?: boolean;
}

const Button = ({ text, onClick, type, submit }: ButtonProps) => {
    const buttonStyles = (() => {
        switch (type) {
            case 'primary':
                return 'bg-primary';
            case 'secondary':
                return 'bg-secondary';
            case 'invisible':
                return 'bg-transparent';
            default:
                return 'bg-primary';
        }
    })();

    return (
        <button
            className={` ${buttonStyles} hover:brightness-90 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline min-w-[150px] transition duration-150 ease-in-out text-text m-1`}
            onClick={onClick}
            type={submit ? "submit" : "button"}
        >
            {text}
        </button>
    );
};

export default Button;