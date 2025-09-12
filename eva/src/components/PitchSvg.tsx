type PitchSvgProps = {
    backgroundColor: string;
};


const PitchSvg: React.FC<PitchSvgProps> = ({ backgroundColor }) => {
    return (
        <svg
            viewBox="0 0 600 400"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="auto"
        >
            {/* Background */}
            <rect width="600" height="400" fill={backgroundColor} />

            {/* Midline */}
            <line x1="300" y1="0" x2="300" y2="400" stroke="#ffffff" strokeWidth="2" />

            {/* Center circle */}
            <circle cx="300" cy="200" r="50" stroke="#ffffff" strokeWidth="2" fill="none" />
            <circle cx="300" cy="200" r="2" fill="#ffffff" />

            {/* Left goal area */}
            <rect x="0" y="140" width="60" height="120" stroke="#ffffff" fill="none" strokeWidth="2" />
            <rect x="0" y="100" width="100" height="200" stroke="#ffffff" fill="none" strokeWidth="2" />

            {/* Right goal area */}
            <rect x="540" y="140" width="60" height="120" stroke="#ffffff" fill="none" strokeWidth="2" />
            <rect x="500" y="100" width="100" height="200" stroke="#ffffff" fill="none" strokeWidth="2" />
        </svg>
    );
}

export default PitchSvg;