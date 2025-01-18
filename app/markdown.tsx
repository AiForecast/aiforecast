// markdown.tsx
import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight as style } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Source = {
  id: string;
  title: string;
  source: string;
};

type MarkdownProps = {
  source: string;
  sources?: Source[];
};

export default function MarkDownTest({ source, sources }: MarkdownProps) {
  const processCitations = (content: string) => {
    // Use lookahead to match consecutive citations
    const parts = content.split(/(\[\d+\](?:\[\d+\])*)/g);

    return parts.map((part, index) => {
      // Match both single and consecutive citations const citations = part.match(/[\[\(](\d+)[\]\)]/g);

      const citations = part.match(/\[(\d+)\]/g);

      if (citations) {
        return citations.map((citation, citationIndex) => {
          const sourceId = parseInt(citation.match(/\[(\d+)\]/)![1]);
          const sourceInfo = sources?.find((s) => parseInt(s.id) === sourceId);

          return sourceInfo ? (
            <TooltipProvider
              key={`${index}-${citationIndex}`}
              delayDuration={0}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <sup className="text-primary cursor-help">{citation}</sup>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm font-medium">{sourceInfo.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {sourceInfo.source}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <sup key={`${index}-${citationIndex}`} className="text-primary">
              {citation}
            </sup>
          );
        });
      }
      return part;
    });
  };


  return (
    <Markdown
      rehypePlugins={[rehypeRaw]}
      components={{
        p({ children }) {
          if (typeof children === 'string') {
            return <p className="mb-4 last:mb-0">{processCitations(children)}</p>;
          }
          return (
            <p className="mb-4 last:mb-0">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </p>
          );
        },
        h1({ children }) {
          if (typeof children === 'string') {
            return <h1 className="font-bold text-3xl mb-6 mt-8">{processCitations(children)}</h1>;
          }
          return (
            <h1 className="font-bold text-3xl mb-6 mt-8">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </h1>
          );
        },
        h2({ children }) {
          if (typeof children === 'string') {
            return <h2 className="font-bold text-2xl mb-4 mt-6">{processCitations(children)}</h2>;
          }
          return (
            <h2 className="font-bold text-2xl mb-4 mt-6">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </h2>
          );
        },
        h3({ children }) {
          if (typeof children === 'string') {
            return <h3 className="font-bold text-xl mb-3 mt-5">{processCitations(children)}</h3>;
          }
          return (
            <h3 className="font-bold text-xl mb-3 mt-5">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </h3>
          );
        },
        ol({ children }) {
          if (typeof children === 'string') {
            return <ol className="list-decimal pl-8">{processCitations(children)}</ol>;
          }
          return (
            <ol className="list-decimal pl-8">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </ol>
          );
        },
        ul({ children }) {
          if (typeof children === 'string') {
            return <ul className="list-disc pl-8">{processCitations(children)}</ul>;
          }
          return (
            <ul className="list-disc pl-8">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </ul>
          );
        },
        li({ children }) {
          if (typeof children === 'string') {
            return <li className="mb-2">{processCitations(children)}</li>;
          }
          return (
            <li className="mb-2">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </li>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="relative border-l-4 border-gray-500 bg-gray-100 p-4 italic my-4">
              {children}
            </blockquote>
          );
        },


        a({ href, children }) {
          if (typeof children === 'string') {
            return <a href={href} className="mb-2 text-teal-500">{processCitations(children)}</a>;
          }
          return (
            <a href={href} className="mb-2 text-teal-500">
              {React.Children.map(children, child => {
                if (typeof child === 'string') {
                  return processCitations(child);
                }
                return child;
              })}
            </a>
          );
        },
        //@ts-ignore
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          return !inline && match ? (

            <SyntaxHighlighter
              //@ts-ignore
              style={style}
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
        }
      }}
    >
      {source}
    </Markdown>
  );
}
