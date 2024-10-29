'use client';
import { TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const ItemTypes = {
  ARTICLE: 'article',
};

const Article = ({ id, content, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ARTICLE,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`relative p-4 mb-2 border rounded cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } dark:bg-gray-800 dark:text-white`}
    >
      {content}
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 text-red-500"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const Row = ({ children, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ARTICLE,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative p-4 mb-4 border-2 border-dotted rounded bg-gray-100 dark:bg-gray-700 ${
        isOver ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-600'
      }`}
    >
      {children}
      {!children && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-300">
          Drop here
        </div>
      )}
    </div>
  );
};

const Column = ({ children, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ARTICLE,
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`relative flex-1 p-4 border-2 border-dotted rounded bg-gray-100 dark:bg-gray-700 ${
        isOver ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-600'
      }`}
    >
      {children}
      {!children && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-300">
          Drop here
        </div>
      )}
    </div>
  );
};

const NewsletterBuilder = () => {
  const [articles, setArticles] = useState([
    { id: 1, content: 'Article 1' },
    { id: 2, content: 'Article 2' },
    { id: 3, content: 'Article 3' },
  ]);

  const [layout, setLayout] = useState([]);
  const [isMultiColumn, setIsMultiColumn] = useState(false);

  const handleDropInRow = (articleId, rowIndex) => {
    setLayout((prevLayout) =>
      prevLayout.map((row, index) =>
        index === rowIndex
          ? { ...row, articleIds: [...row.articleIds, articleId] }
          : row
      )
    );
  };

  const handleDropInColumn = (articleId, rowIndex, columnIndex) => {
    setLayout((prevLayout) =>
      prevLayout.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              columns: row.columns.map((col, colIndex) =>
                colIndex === columnIndex
                  ? { ...col, articleIds: [...col.articleIds, articleId] }
                  : col
              ),
            }
          : row
      )
    );
  };

  const addRow = () => {
    setLayout((prevLayout) => [
      ...prevLayout,
      isMultiColumn
        ? { type: 'multi-column', columns: [{ articleIds: [] }, { articleIds: [] }] }
        : { type: 'single-column', articleIds: [] },
    ]);
  };

  const removeArticle = (articleId, rowIndex, columnIndex = null) => {
    setLayout((prevLayout) =>
      prevLayout.map((row, index) =>
        index === rowIndex
          ? columnIndex !== null
            ? {
                ...row,
                columns: row.columns.map((col, colIndex) =>
                  colIndex === columnIndex
                    ? {
                        ...col,
                        articleIds: col.articleIds.filter((id) => id !== articleId),
                      }
                    : col
                ),
              }
            : {
                ...row,
                articleIds: row.articleIds.filter((id) => id !== articleId),
              }
          : row
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[8.5in] h-[11in] border-2 border-black p-4 dark:border-white">
        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 border rounded ${
              !isMultiColumn ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsMultiColumn(false)}
          >
            Single Column
          </button>
          <button
            className={`px-4 py-2 border rounded ${
              isMultiColumn ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setIsMultiColumn(true)}
          >
            Multi Column
          </button>
          <button
            className="px-4 py-2 ml-4 border rounded bg-green-500 text-white"
            onClick={addRow}
          >
            Add Row
          </button>
        </div>
        {layout.map((row, rowIndex) => {
          if (row.type === 'single-column') {
            return (
              <Row key={rowIndex} onDrop={(articleId) => handleDropInRow(articleId, rowIndex)}>
                {row.articleIds.map((articleId) => {
                  const article = articles.find((a) => a.id === articleId);
                  return (
                    <Article
                      key={article.id}
                      id={article.id}
                      content={article.content}
                      onRemove={() => removeArticle(article.id, rowIndex)}
                    />
                  );
                })}
              </Row>
            );
          } else if (row.type === 'multi-column') {
            return (
              <div key={rowIndex} className="flex mb-4">
                {row.columns.map((column, columnIndex) => (
                  <Column
                    key={columnIndex}
                    onDrop={(articleId) => handleDropInColumn(articleId, rowIndex, columnIndex)}
                  >
                    {column.articleIds.map((articleId) => {
                      const article = articles.find((a) => a.id === articleId);
                      return (
                        <Article
                          key={article.id}
                          id={article.id}
                          content={article.content}
                          onRemove={() => removeArticle(article.id, rowIndex, columnIndex)}
                        />
                      );
                    })}
                  </Column>
                ))}
              </div>
            );
          }
          return null;
        })}
        {/* Ensure there's always a visible drop area */}
        <Row onDrop={(articleId) => handleDropInRow(articleId, layout.length)} />
      </div>
      <div className="mt-4">
        {articles.map((article) => (
          <Article key={article.id} id={article.id} content={article.content} />
        ))}
      </div>
    </DndProvider>
  );
};

export default NewsletterBuilder;