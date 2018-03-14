import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { QUERY_ALL_DIARLIES } from './DiaryList';

const DiaryDelete = ({ item, mutate }) => {
    const onClick = ( event ) => {
        if (window.confirm('削除しますか？')) {
            mutate({ variables: { id: item.id } });
        } else {
            return;
        }
    };
    return (
        <button onClick={onClick}>削除</button>
    );
};

// 日記削除クエリ作成
const DELETE_DIARY = gql`
    mutation deleteDiary($id: ID!) {
        deleteDiary(id: $id) {
            id
        }
    }
`;

const config = {
    options: {
        update: (proxy, { data: { deleteDiary } }) => {
            const data = proxy.readQuery({ query: QUERY_ALL_DIARLIES });
            const index = data.allDiaries.findIndex(diary => diary.id === deleteDiary.id);

            if (index >= 0) {
                // 指定要素削除
                data.allDiaries.splice(index,1);
                proxy.writeQuery({ query: QUERY_ALL_DIARLIES, data });
            }
        },
    },
};

export default graphql(DELETE_DIARY, config)(DiaryDelete);