import { db } from "@/server/db";
import { forum, forumComments, forumCommentsReaction, forumTagAssignments, forumTags, members } from "@/server/db/schemas";
import { error } from "console";
import { eq } from "drizzle-orm";
import { printProgress } from "./utils";


export async function Forum(data: any) {
    await db.execute('TRUNCATE TABLE forum_tag_assignments RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE forum_comment_reaction RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE forum_tags RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE forum_comment RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE forum RESTART IDENTITY CASCADE');


    for (const c of data.category) {
        await db.insert(forumTags).values({
            name: c.name
        })

    }


    const categoryMapping = [
        { name: 'general', id: 3 },
        { name: 'fishing', id: 6 },
        { name: 'lake', id: 10 },
        { name: 'game', id: 8 },
        { name: 'trap', id: 12 },
        { name: 'dinner', id: 14 },
        { name: 'camping', id: 7 },
        { name: 'membership', id: 11 },
        { name: 'rifle', id: 13 },
        { name: 'hunting', id: 9 },
        { name: 'forsale', id: 15 },
        { name: 'archery', id: 5 },
    ]

    const ignorePosts = ['5fb3eb847fb4ab603be136a9', '5fb3eb867fb4ab603be136af', '5fb3eb877fb4ab603be136b0'];
    let count = 0;
    for (const d of data.post.sort((a, b) => a.created_at - b.created_at)) {
        if (d.message) {
            if (ignorePosts.includes(d._id + '')) {
                continue;
            }
            console.log(d)
            const category = categoryMapping.find((c) => c.name === d.category);
            const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, d.createdBy + '') });
            const comments = data.comment.filter((c) => c.postId === d._id + '').sort((a, b) => a.created_at - b.created_at);

            if (!memberRecord) {
                throw new Error('Member not found for post ' + d._id);
            }



            const post = await db.insert(forum).values({
                name: d.name,
                createdBy: memberRecord.id,
                slug: d.slug,
                created_at: d.created_at,
            }).returning({ id: forum.id });

            await db.insert(forumTagAssignments).values({
                tag: category.id,
                post: post[0].id
            })

            const comment = await db.insert(forumComments).values({
                post: post[0].id,
                member: memberRecord.id,
                comment: d.message,
            }).returning({ id: forumComments.id });

            if (d.reactions) {
                if (d.reactions.like) {
                    for (const r of d.reactions.like) {
                        const likeMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, r + '') });
                        if (likeMemberRecord) {
                            await db.insert(forumCommentsReaction).values(
                                { comment: comment[0].id, member: likeMemberRecord.id, reaction: 'like' }
                            );
                        }
                    }
                }
                if (d.reactions.dislike) {
                    for (const r of d.reactions.dislike) {
                        const dislikeMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, r + '') });
                        if (dislikeMemberRecord) {
                            await db.insert(forumCommentsReaction).values(
                                { comment: comment[0].id, member: dislikeMemberRecord.id, reaction: 'dislike' }
                            );
                        }
                    }
                }
                if (d.reactions.helpful) {
                    for (const r of d.reactions.helpful) {
                        const helpfulMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, r + '') });
                        if (helpfulMemberRecord) {
                            await db.insert(forumCommentsReaction).values(
                                { comment: comment[0].id, member: helpfulMemberRecord.id, reaction: 'helpful' }
                            );
                        }
                    }
                }
                if (d.reactions.notHelpful) {
                    for (const r of d.reactions.notHelpful) {
                        const nothelpfulMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, r + '') });
                        if (nothelpfulMemberRecord) {
                            await db.insert(forumCommentsReaction).values(
                                { comment: comment[0].id, member: nothelpfulMemberRecord.id, reaction: 'notHelpful' }
                            );
                        }
                    }
                }
            }

            for (const c of comments.sort((a, b) => a.created_at - b.created_at)) {
                if (c.comment) {
                    const newComment = await db.insert(forumComments).values({
                        post: post[0].id,
                        member: memberRecord.id,
                        comment: c.comment,
                    }).returning({ id: forumComments.id });

                    if (c.reactions) {
                        if (c.reactions.like) {
                            for (const r of c.reactions.like) {
                                const likeMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, c.member + '') });
                                if (likeMemberRecord) {
                                    await db.insert(forumCommentsReaction).values(
                                        { comment: newComment[0].id, member: likeMemberRecord.id, reaction: 'like' }
                                    );
                                }
                            }
                        }
                        if (c.reactions.dislike) {
                            for (const r of c.reactions.dislike) {
                                const dislikeMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, c.member + '') });
                                if (dislikeMemberRecord) {
                                    await db.insert(forumCommentsReaction).values(
                                        { comment: newComment[0].id, member: dislikeMemberRecord.id, reaction: 'dislike' }
                                    );
                                }
                            }
                        }
                        if (c.reactions.helpful) {
                            for (const r of c.reactions.helpful) {
                                const helpfulMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, c.member + '') });
                                if (helpfulMemberRecord) {
                                    await db.insert(forumCommentsReaction).values(
                                        { comment: newComment[0].id, member: helpfulMemberRecord.id, reaction: 'helpful' }
                                    );
                                }
                            }
                        }
                        if (c.reactions.notHelpful) {
                            for (const r of c.reactions.notHelpful) {
                                const nothelpfulMemberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, c.member + '') });
                                if (nothelpfulMemberRecord) {
                                    await db.insert(forumCommentsReaction).values(
                                        { comment: newComment[0].id, member: nothelpfulMemberRecord.id, reaction: 'notHelpful' }
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
        count++;
        printProgress('Forum posts migrated: ' + count + ' of ' + data.post.length);
    }


}