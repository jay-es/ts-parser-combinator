「TypeScript でゼロから作るパーサコンビネータ」の実装
https://blog.livewing.net/typescript-parser-combinator

小さなパーサ関数を組み合わせることで、複雑な構文を解析
- パーサ関数: 文字列を入力し、入力の先頭から任意の長さの文字列を消費して、解析結果を出力する関数
- パーサコンビネータ: パーサ関数を引数にとり、パーサ関数を変形したり合成する関数
