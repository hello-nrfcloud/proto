import ts from 'typescript'

export const addDocBlock =
	(comment?: string[] | string) =>
	<Node extends ts.Node>(node: Node): Node => {
		if (comment === undefined) return node
		ts.addSyntheticLeadingComment(
			node,
			ts.SyntaxKind.MultiLineCommentTrivia,
			`*\n * ${Array.isArray(comment) ? comment.join('\n * ') : comment} \n `,
			true,
		)
		return node
	}
