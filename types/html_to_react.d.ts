declare module "html-to-react";

declare type NodeValidator = (node: Node) => boolean;
declare type NodePreprocessor = (node: Node, index: Number) => void;
declare type NodeProcessor = (node: Node, children: Node[], index: Number) => void;

declare interface ProcessingInstruction {
	shouldProcessNode?: NodeValidator;
	processNode?: NodeProcessor;
}

declare interface PreprocessingInstruction {
	shouldPreprocessNode?: NodeValidator;
	preprocessNode?: NodePreprocessor;
}

declare class Parser {
	public parse(html: string): React.ReactNode;

	public parseWithInstructions(
		html: string, 
		isValidNode: NodeValidator, 
		processingInstructions: ProcessingInstruction[],
		preprocessingInstructions: PreprocessingInstruction[]
	): React.ReactNode;
}