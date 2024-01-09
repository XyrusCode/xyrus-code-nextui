// @ts-nocheck
import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

// import { CustomMarkdownInput } from '../../../components/CustomMarkdownInput';

export default defineType({
	type: 'document',
	name: 'snippet',
	title: 'Snippet',
	icon: DocumentIcon,
	fields: [
		defineField({
			type: 'string',
			name: 'title',
			title: 'Title',
			validation: (rule) => rule.required(),
		}),
		defineField({
			type: 'slug',
			name: 'slug',
			title: 'Slug',
			options: {
				source: 'title',
			},
			validation: (rule) => rule.required(),
		}),
		// defineField({
		// 	type: 'markdown',
		// 	name: 'markdown',
		// 	title: 'Markdown',
		// 	components: { input: CustomMarkdownInput },
		// }),
	],
	// preview: {
	//   select: {
	//     title: 'title',
	//   },
	//   prepare({ title }) {
	//     return {
	//       subtitle: 'Page',
	//       title,
	//     }
	//   },
	// },
});
