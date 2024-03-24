// import type { PortableTextBlock } from '@portabletext/types'
import { Button, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
// import { CustomPortableText } from '@/components/shared/CustomPortableText'
import ImageBox from '@/components/shared/ImageBox';
import type { Post } from '@/types/sanity';

interface PostProps {
	post: Post
	odd: number
}

export function PostListItem(props: PostProps) {
	const { post, odd } = props;

	return (
		<div
			className={`flex flex-col gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row ${odd && 'border-b border-t xl:flex-row-reverse'
				}`}
		>
			<Card className="py-4">
				<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
					<h4 className="font-bold text-large">{post.title}</h4>

					<small className="text-default-500">By {post.author?.name}</small>
					{post?.coverImage?.url}
				</CardHeader>
				<CardBody className="overflow-visible py-2">
					<ImageBox
						image={post.coverImage}
						alt={`Cover image from ${post.title}`}
						classesWrapper="relative aspect-[16/9]"
					/>
				</CardBody>

				<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
					<p className="text-tiny text-white/80">{post.tags?.map((tag, key) => (
						<div className="text-sm font-medium lowercase md:text-lg" key={key}>
							#{tag}
						</div>
					))}</p>

				</CardFooter>
			</Card>
		</div>
	);
}

