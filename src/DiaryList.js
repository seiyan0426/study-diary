import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import NewDiary from './NewDiary';
import DiaryItem from './DiaryItem';

const DiaryList = ({ data: { loading, error, allDiaries } }) => (
    loading ? <p>Loading...</p> :
    error ? <p>Error: {error.message}</p> : (
        <div className="content">
            {/* 登録用コンポーネント */}
            <NewDiary />
            {/* 一覧コンポーネント */}
            {allDiaries.map(diary => (
                // keyを割り当てないとどの配列の要素に追加するのか、更新するのかReactがわからない
                <DiaryItem item={diary} key={diary.id} />
            ))}
        </div>
    )
);

// 日記一覧取得クエリ生成
export const QUERY_ALL_DIARLIES = gql`
{
    allDiaries(orderBy: createdAt_DESC) {
        id
        createdAt
        title
        description
    }
}
`;

export default graphql(QUERY_ALL_DIARLIES)(DiaryList);