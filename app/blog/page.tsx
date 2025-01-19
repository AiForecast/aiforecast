'use client';

import { BlogLayout } from '@/components/blog/BlogLayout';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const defaultMarkdown = `# Welcome to AiForecast Blog

## Introduction

AiForecast is a revolutionary platform that combines the power of AI and blockchain technology to provide accurate predictions and insights.

### Key Features

- AI-powered predictions
- Blockchain integration
- Real-time data analysis
- Customizable dashboards

\`\`\`javascript
// Example code
const aiforecast = new AiForecast({
  mode: 'prediction',
  blockchain: true
});

aiforecast.predict({
  data: historicalData,
  model: 'advanced'
});
\`\`\`
`;

export default function BlogPage() {
  const [content, setContent] = useState(defaultMarkdown);

  return (
    <BlogLayout>
      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </BlogLayout>
  );
}
