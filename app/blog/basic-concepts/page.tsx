'use client';

import { BlogLayout } from '@/components/blog/BlogLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const content = `# Basic Concepts in AiForecast

Understanding the fundamental concepts of AiForecast will help you make the most of our platform.

## Core Components

### 1. Prediction Engine

The heart of AiForecast is our advanced prediction engine that combines multiple AI models:

\`\`\`typescript
interface PredictionEngine {
  models: {
    timeSeries: AIModel;
    sentiment: AIModel;
    blockchain: BlockchainModel;
  };
  accuracy: number;
  confidence: number;
}
\`\`\`

### 2. Blockchain Integration

Our blockchain integration ensures:

- Data integrity
- Transparent predictions
- Immutable record keeping
- Decentralized verification

### 3. AI Models

AiForecast uses several types of AI models:

| Model Type | Use Case | Accuracy |
|------------|----------|-----------|
| Time Series | Price Prediction | 95% |
| Sentiment | Market Mood | 87% |
| Hybrid | Combined Analysis | 92% |

## Data Flow

1. **Input**: Raw data enters the system
2. **Processing**: AI models analyze the data
3. **Verification**: Blockchain validates the results
4. **Output**: Predictions are generated

## Key Terms

- **Confidence Score**: Measure of prediction reliability
- **Blockchain Hash**: Unique identifier for each prediction
- **Model Ensemble**: Combined AI models for better accuracy
- **Real-time Analysis**: Continuous data processing

## Example Implementation

\`\`\`javascript
// Basic prediction flow
const forecast = new AiForecast();

// Configure models
forecast.configureModels({
  timeSeriesEnabled: true,
  sentimentAnalysis: true,
  blockchainVerification: true
});

// Make prediction
const result = await forecast.predict({
  data: inputData,
  timeframe: '1d',
  confidence: 0.95
});
\`\`\`

Understanding these basic concepts will help you better utilize AiForecast's capabilities.
`;

export default function BasicConceptsPage() {
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
