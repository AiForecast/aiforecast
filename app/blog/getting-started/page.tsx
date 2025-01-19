'use client';

import { BlogLayout } from '@/components/blog/BlogLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const content = `# Getting Started with AiForecast

Welcome to AiForecast! This guide will help you get up and running with our platform quickly and efficiently.

## Quick Start Guide

### 1. Installation

First, install the AiForecast package:

\`\`\`bash
npm install aiforecast
# or
yarn add aiforecast
\`\`\`

### 2. Basic Setup

Create your first AiForecast instance:

\`\`\`javascript
import { AiForecast } from 'aiforecast';

const ai = new AiForecast({
  apiKey: 'your-api-key',
  mode: 'production'
});
\`\`\`

### 3. Making Your First Prediction

Here's a simple example of how to make predictions:

\`\`\`javascript
// Prepare your data
const data = {
  historical: [...],
  parameters: {
    timeframe: '1d',
    confidence: 0.95
  }
};

// Get prediction
const prediction = await ai.predict(data);
console.log(prediction);
\`\`\`

## Best Practices

1. Always validate your input data
2. Use appropriate confidence levels
3. Monitor prediction accuracy
4. Implement error handling

## Next Steps

- Explore advanced features
- Set up real-time monitoring
- Configure blockchain integration
- Customize your dashboard

Need help? Join our [community](https://discord.gg/aiforecast) or check out our [documentation](https://docs.aiforecast.co).
`;

export default function GettingStartedPage() {
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
