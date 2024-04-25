interface PrimaryHeadingProps {
    text: string;
}

const PrimaryHeading = ({text}: PrimaryHeadingProps) => {
    return <p className="text-3xl text-text">
        {text}
    </p>
}

export default PrimaryHeading;