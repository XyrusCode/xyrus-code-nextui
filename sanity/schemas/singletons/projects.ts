import { CaseIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'projects',
	title: 'Projects',
	type: 'document',
	icon: CaseIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: 'title',
			description: 'This field is the title of your projects page.',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'overview',
			description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
			title: 'Description',
			type: 'array',
			of: [
				// Paragraphs
				defineArrayMember({
					lists: [],
					marks: {
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'Link',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'Url',
									},
								],
							},
						],
						decorators: [
							{
								title: 'Italic',
								value: 'em',
							},
							{
								title: 'Strong',
								value: 'strong',
							},
						],
					},
					styles: [],
					type: 'block',
				}),
			],
			validation: (rule) => rule.max(155).required(),
		}),
		defineField({
			name: 'showcaseProjects',
			title: 'Showcase projects',
			description:
        'These are the projects that will appear on the page.',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'project' }],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title }) {
			return {
				subtitle: 'Projects',
				title,
			};
		},
	},
});
