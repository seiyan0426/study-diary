import React from 'react';
import ReactDom from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { QUERY_ALL_DIARLIES } from './DiaryList';
import './css/NewDiary.css'

const NewDiary = ({ mutate }) => {
    const onClick = (event) => {
        event.preventDefault();
        const title = ReactDom.findDOMNode(this.title).value;
        if (!title) {
            alert('タイトルの入力は必須です。')
            return;
        }
        const description = ReactDom.findDOMNode(this.description).value;
        mutate({ variables: { title, description } });
    };
    return (
        <form className="item-area">
            <p>入力フォーム</p>
            <p>
                <span>タイトル：</span><input ref={(ref) => this.title = ref} />
            </p>
            <p>
                <textarea ref={(ref) => this.description = ref} cols="50" rows="10" placeholder="学習内容を記載するのであーる。" />
            </p>
            <p>
                <button type="submit" onClick={onClick}>登録</button>
            </p>
        </form>
    );
};


// 日記登録クエリ
const CREATE_DIARY = gql`
    mutation createDiary($title: String!, $description: String) {
        createDiary(title: $title, description: $description) {
            id
            createdAt
            title
            description
        }
    }
`;

const config = {
    options: {
        // ローカルキャッシュを更新するのがupdateである
        // 最初に10件取得し、1件登録時にサーバから再度11件取得したくないため、
        // ローカルキャッシュされている10件に1件追加している
        update: (proxy, { data: { createDiary } }) => {
            // QUERY_ALL_DIARLIESの結果はキャッシュに入っているため、
            // readQueryにて配列データを取得し、配列に投入する
            const data = proxy.readQuery({ query: QUERY_ALL_DIARLIES });
            data.allDiaries.unshift(createDiary);
            //console.log(data);
            // キャッシュを更新
            proxy.writeQuery({ query: QUERY_ALL_DIARLIES, data });
        }
        // 上記はMutationを発行した画面にしか適応されない。
        // 同じページを複数人が見ている時のことを考えて、一覧に関して定期的にデータを更新するようにpollInterValを指定する
        // pollInterVal: 5000
        // ,
    },
};

export default graphql(CREATE_DIARY, config)(NewDiary);