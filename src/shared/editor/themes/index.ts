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
  code: `
    relative 
    block
    bg-[#f7fafb]
    dark:bg-gray-800 
    font-mono 
    text-[14px]
    text-gray-900
    dark:text-gray-100
    px-2 
    py-2 
    pl-[52px] 
    my-2
    leading-[1.6]
    overflow-x-auto 
    tab-[2]
    before:content-[attr(data-gutter)]
    before:text-gray-400
    dark:before:text-gray-500
    before:absolute
    before:top-0
    before:left-0
    before:bg-[#d9dddf]
    dark:before:bg-gray-700
    before:p-2
    before:min-w-[32px]
    before:h-full
    before:text-right
  `,
  codeHighlight: {
    atrule: 'text-purple-500 dark:text-purple-400',
    attr: 'text-purple-500 dark:text-purple-400',
    boolean: 'text-blue-500 dark:text-blue-400',
    builtin: 'text-green-500 dark:text-green-400',
    cdata: 'text-gray-500 dark:text-gray-400 italic',
    char: 'text-green-500 dark:text-green-400',
    class: 'text-yellow-500 dark:text-yellow-400',
    'class-name': 'text-yellow-500 dark:text-yellow-400',
    comment: 'text-gray-500 dark:text-gray-400 italic',
    constant: 'text-blue-500 dark:text-blue-400',
    deleted: 'text-blue-500 dark:text-blue-400',
    doctype: 'text-gray-500 dark:text-gray-400 italic',
    entity: 'text-pink-500 dark:text-pink-400',
    function: 'text-yellow-500 dark:text-yellow-400',
    important: 'text-red-500 dark:text-red-400',
    inserted: 'text-green-500 dark:text-green-400',
    keyword: 'text-purple-500 dark:text-purple-400',
    namespace: 'text-red-500 dark:text-red-400',
    number: 'text-blue-500 dark:text-blue-400',
    operator: 'text-pink-500 dark:text-pink-400',
    prolog: 'text-gray-500 dark:text-gray-400 italic',
    property: 'text-blue-500 dark:text-blue-400',
    punctuation: 'text-gray-500 dark:text-gray-400',
    regex: 'text-red-500 dark:text-red-400',
    selector: 'text-green-500 dark:text-green-400',
    string: 'text-green-500 dark:text-green-400',
    symbol: 'text-blue-500 dark:text-blue-400',
    tag: 'text-blue-500 dark:text-blue-400',
    url: 'text-pink-500 dark:text-pink-400',
    variable: 'text-red-500 dark:text-red-400',
  },
  codeBlock: 'bg-gray-50 rounded-lg p-4 my-4 font-mono text-sm',

  // 링크 스타일링
  link: `
    text-blue-600 
    dark:text-blue-400
    hover:text-blue-800 
    dark:hover:text-blue-300
    underline 
    decoration-1 
    underline-offset-2
    transition-colors
    cursor-pointer
  `,

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
