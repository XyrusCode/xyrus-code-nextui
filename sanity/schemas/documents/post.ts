// @ts-nocheck
import { BookIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineField, defineType } from 'sanity';

import authorType from './author';

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
	name: 'post',
	title: 'Post',
	icon: BookIcon,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
				isUnique: (value: any, context: { defaultIsUnique: (arg0: any, arg1: any) => any }) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{
					type: 'block',
				},
				{
					type: 'image',
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: 'caption',
							type: 'string',
							title: 'Image caption',
							description: 'Caption displayed below the image.',
						},
						{
							name: 'alt',
							type: 'string',
							title: 'Alternative text',
							description: 'Important for SEO and accessiblity.',
						},
					],
				},
				{
					type: 'code',
					name: 'myCodeField',
					title: 'Code with all options',
					options: {
						language: 'typescript',
						languageAlternatives: [
							{title: 'Typescript', value: 'typescript'},
							{ title: 'Javascript', value: 'javascript' },
							{title: 'JSON', value: 'json'},
							{ title: 'CSS', value: 'css' },
							{ title: 'Bash', value: 'bash' },
							{ title: 'Markdown', value: 'markdown' },
							{ title: 'HTML', value: 'html' },
							{ title: 'Shell', value: 'shell' },
							{title: 'SQL', value: 'sql'},
						]
					},
					withFilename: true
				}
			],
		}),
		defineField({
			name: 'excerpt',
			title: 'Excerpt',
			type: 'text',
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'date',
			title: 'Date',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: authorType.name }],
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags',
			},
		}),
	],
	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			date: 'date',
			media: 'coverImage',
		},
		prepare({ title, media, author, date }) {
			const subtitles = [
				author && `by ${author}`,
				date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
			].filter(Boolean);

			return { title, media, subtitle: subtitles.join(' ') };
		},
	},
});
