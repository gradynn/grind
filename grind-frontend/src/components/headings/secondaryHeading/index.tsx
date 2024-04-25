interface SecondaryHeadingProps {
    text: string;
}

const SecondaryHeading = ({text}: SecondaryHeadingProps) => {
    return <p className="text-xl text-text-2">
        {text}
    </p>
}

export default SecondaryHeading;