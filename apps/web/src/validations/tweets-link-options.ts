import { linkOptions } from '@tanstack/react-router';
import * as v from 'valibot';

export const tweetsSearchSchema = v.object({
  searchString: v.fallback(v.string(), ''),
  sortDirection: v.fallback(v.picklist(['asc', 'desc']), 'desc'),
});

export type TweetSearchSchema = v.InferOutput<typeof tweetsSearchSchema>;

export const tweetsSearchDefaults = v.getFallbacks(tweetsSearchSchema);

export const tweetsLinkOptions = linkOptions({
  to: '/tweets',

  /**
   * If we want links to contain default values in the URL
   */
  // search: tweetsSearchDefaults,
});
