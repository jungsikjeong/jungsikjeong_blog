const EditorTheme = {
  // 텍스트 스타일링
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
  },

  // 제목 스타일링
  heading: {
    h1: 'text-3xl font-bold mt-6 mb-4',
    h2: 'text-2xl font-bold mt-5 mb-3',
    h3: 'text-xl font-bold mt-4 mb-2',
    h4: 'text-lg font-bold mt-3 mb-2',
    h5: 'text-base font-bold mt-2 mb-1',
  },

  // 리스트 스타일링
  list: {
    ul: 'list-disc ml-6 my-2 space-y-1',
    ol: 'list-decimal ml-6 my-2 space-y-1',
    listitem: 'pl-1.5',
    nested: {
      listitem: 'ml-6',
      list: 'my-1 space-y-1',
    },
  },

  // 인용구 스타일링
  quote: 'border-l-4 border-gray-200 pl-4 my-4 italic',

  // 코드 블록 스타일링
  code: 'bg-gray-100 rounded px-1.5 py-0.5 font-mono text-sm',
  codeBlock: 'bg-gray-50 rounded-lg p-4 my-4 font-mono text-sm',

  // 링크 스타일링
  link: 'text-blue-600 hover:text-blue-800 underline',

  // 이미지 스타일링
  image: 'max-w-full h-auto rounded-lg my-4',

  // 구분선 스타일링
  hr: 'my-6 border-t border-gray-200',

  // 테이블 스타일링
  table: 'w-full my-4 border-collapse border border-gray-200',

  // 편집기 기본 스타일
  editor: {
    input:
      'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none',
    placeholder: 'text-gray-400 absolute top-3 left-4 pointer-events-none',
  },
}

export default EditorTheme
