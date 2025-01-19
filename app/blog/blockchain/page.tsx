'use client';

import { BlogLayout } from '@/components/blog/BlogLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const content = `# Blockchain Technology in AiForecast

AiForecast leverages blockchain technology to ensure transparency, security, and decentralization in AI predictions.

## Blockchain Integration

### Smart Contracts

Our platform uses smart contracts for prediction verification:

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AiForecastPrediction {
    struct Prediction {
        bytes32 dataHash;
        uint256 timestamp;
        address validator;
        uint256 confidence;
        bytes prediction;
    }
    
    mapping(bytes32 => Prediction) public predictions;
    
    event PredictionMade(bytes32 indexed id, bytes32 dataHash, uint256 timestamp);
    
    function makePrediction(
        bytes32 _id,
        bytes32 _dataHash,
        bytes calldata _prediction,
        uint256 _confidence
    ) external {
        predictions[_id] = Prediction({
            dataHash: _dataHash,
            timestamp: block.timestamp,
            validator: msg.sender,
            confidence: _confidence,
            prediction: _prediction
        });
        
        emit PredictionMade(_id, _dataHash, block.timestamp);
    }
}
\`\`\`

### Verification Process

1. **Data Hashing**
   - Input data is hashed
   - Predictions are stored with hash
   - Results are verifiable

2. **Consensus Mechanism**
   - Multiple validators
   - Proof of Prediction (PoP)
   - Decentralized verification

## Key Features

### 1. Immutable Records

All predictions are permanently stored:

\`\`\`typescript
interface PredictionRecord {
  id: string;
  timestamp: number;
  dataHash: string;
  prediction: string;
  confidence: number;
  validator: string;
}
\`\`\`

### 2. Transparent Validation

| Stage | Process | Time |
|-------|---------|------|
| Hash Generation | SHA3-256 | 1ms |
| Smart Contract | Validation | 2-5s |
| Consensus | PoP | 10s |
| Record | Storage | 2s |

### 3. Integration Example

\`\`\`javascript
// Initialize blockchain connection
const blockchain = new AiForecastChain({
  network: 'mainnet',
  contract: PREDICTION_CONTRACT_ADDRESS
});

// Make and verify prediction
async function makePrediction(data) {
  // Generate prediction
  const prediction = await ai.predict(data);
  
  // Hash and store on blockchain
  const hash = blockchain.hashData(data);
  const tx = await blockchain.storePrediction({
    hash,
    prediction,
    confidence: prediction.confidence
  });
  
  return {
    prediction,
    transactionHash: tx.hash,
    blockNumber: tx.blockNumber
  };
}
\`\`\`

## Security Features

1. **Encryption**
   - End-to-end encryption
   - Secure key management
   - Protected data storage

2. **Access Control**
   - Role-based access
   - Multi-sig validation
   - Permissioned networks

## Future Development

- Layer 2 scaling solutions
- Cross-chain integration
- Enhanced privacy features
- Improved validation speed

Join our [Discord](https://discord.gg/aiforecast) for technical discussions about our blockchain integration.
`;

export default function BlockchainPage() {
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
