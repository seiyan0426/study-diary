import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { QUERY_ALL_DIARLIES } from './DiaryList';
import DiaryDelete from './DiaryDelete';
import './css/DiaryItem.css';

const DiaryItem = ({ item, mutate }) => {
    const onClick = ( event ) => {
        const id = item.id;
        const newDescription = document.getElementById(id);
        if (window.confirm('更新しますか？')) {
            mutate({ variables: { id: item.id, description: newDescription.value } });
        } else {
            return;
        }
    };
    return (
        <div className="item-area">

            <hr />
            <p>タイトル：{item.title}</p>
            
            <p>
                <textarea id={item.id} cols="50" rows="10" defaultValue={item.description} />
            </p>
            <p>
                <button className="upd-btn" type="submit" onClick={onClick}>更新</button>
                {/* 現在のApolloのバージョンでは、1コンポーネントファイルにつき1つのクエリしか指定ができない。
                そのため、削除時のクエリについては、別クエリとする。 */}
                <DiaryDelete item={item} />
            </p>

            <p style={{ textAlign: 'left', color: 'black' }}>
                {new Date(item.createdAt).toDateString()}
            </p>

        </div>
    );
};

// 日記更新クエリ作成
const UPDATE_DIARY = gql`
    mutation updateDiary($id: ID!, $description: String) {
        updateDiary(id: $id, description: $description) {
            id
            description
        }
    }
`;

const config = {
    options: {
        update: (proxy, { data: { updateDiary } }) => {
            const data = proxy.readQuery({ query: QUERY_ALL_DIARLIES });
            const index = data.allDiaries.findIndex(diary => diary.id === updateDiary.id);

            if (index >= 0) {
                // console.log(data.allDiaries[index].description);
                // console.log(updateDiary.description);
                // 指定要素更新（キャッシュの書き換え）
                data.allDiaries[index].description = updateDiary.description;
                proxy.writeQuery({ query: QUERY_ALL_DIARLIES, data });
            }
        },
    },
};

export default graphql(UPDATE_DIARY, config)(DiaryItem);