'use client';

import { BlogLayout } from '@/components/blog/BlogLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const content = `# Introduction to AiForecast

AiForecast is a groundbreaking platform that combines the power of blockchain technology with advanced AI capabilities to revolutionize the way we handle predictions and data analysis.

## What Makes AiForecast Different?

- **Blockchain Integration**: Secure, transparent, and decentralized data handling
- **Advanced AI Models**: State-of-the-art prediction algorithms
- **Real-time Analysis**: Instant insights from your data
- **User-friendly Interface**: Intuitive design for both beginners and experts

## Why Choose AiForecast?

1. **Accuracy**: Our AI models are trained on vast amounts of data
2. **Security**: Blockchain technology ensures your data is secure
3. **Scalability**: Handle any amount of data with ease
4. **Customization**: Tailor the platform to your specific needs

## Core Technologies

\`\`\`python
# Example of AiForecast's prediction system
from aiforecast import Predictor

predictor = Predictor(
    model="advanced",
    blockchain_enabled=True,
    real_time=True
)

# Make predictions
results = predictor.analyze(data)
confidence = predictor.get_confidence_score()
\`\`\`

Stay tuned for more detailed information about specific features and capabilities!
`;

export default function IntroductionPage() {
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
