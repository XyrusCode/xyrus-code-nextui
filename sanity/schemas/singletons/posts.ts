import { BookIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
	name: 'posts',
	title: 'Blog Posts',
	type: 'document',
	icon: BookIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: 'title',
			description: 'This is the title for the blog posts page.',
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
			name: 'blogPosts',
			title: 'Blog Posts',
			description:
        'These are the posts will be show non the blog page.',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'post' }],
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
				subtitle: 'Blog',
				title,
			};
		},
	},
});
