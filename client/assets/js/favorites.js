import { checkForIndexedDb, useIndexedDb } from './indexedDb';
import { renderArticles } from './domMethods';

function loadPage() {
  if (checkForIndexedDb()) {
    useIndexedDb("articles", "ArticleStore", "get").then(results => {
      renderArticles(results);
    });
  }
}

loadPage();
