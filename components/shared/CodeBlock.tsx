import { Snippet } from '@nextui-org/react';
// import { useTheme } from 'next-themes';

export type Code = {
  text: string;
  language:
    | 'bash'
    | 'typescript'
    | 'sql'
    | 'css'
    | 'javascript'
    | 'json'
    | 'html'
    | 'markdown';
  highlightedLines?: any;
};

const formatCode = (code: Code, isDark: boolean) => {
	const commonStyle = 'p-4 rounded whitespace-pre-line overflow-x-scroll';
	const darkModeBackground = isDark ? 'bg-gray-800 text-white' : '';

	switch (code.language) {
	case 'bash':
		return (
			<div className={`${commonStyle} ${darkModeBackground}`}>
				{code.text}
			</div>
		);
	case 'typescript':
	case 'sql':
	case 'css':
	case 'javascript':
	case 'json':
	case 'html':
	case 'markdown':
		return (
			<div className={`${commonStyle} ${darkModeBackground}`}>
				{code.text}
			</div>
		);
	default:
		return (
			<div className={`${commonStyle} ${darkModeBackground}`}>
				{code.text}
			</div>
		);
	}
};

const CodeBlock = ({ text, language, highlightedLines }: Code) => {
	// const { theme } = useTheme();
	// const isDark = theme === 'dark';
	const isDark = false;

	return (
		<Snippet hideSymbol={language !== 'bash'}>
			{formatCode({ text, language }, isDark)}
		</Snippet>
	);
};

export default CodeBlock;
