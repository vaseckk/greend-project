import Sidebar from '../../pages-components/sidebar/sidebar.tsx';
import Header from '../../pages-components/header/header.tsx';
import '../boards-agile/boards-agile.scss';
import BADropdown from '../../pages-components/boards-agile-components/dropdown/boards-agile-dropdown.tsx';
import BoardsAgileTable from '../../pages-components/boards-agile-components/table/boards-agile-table.tsx';
import BoardsAgileStory from '../../pages-components/boards-agile-components/story/boards-agile-story.tsx';

function BoardsAgile(): JSX.Element {

  return (
    <main className="boards-agile page__main">
      <div className="boards-agile-parametrs page__main__parametres">
        <div className="boards-agile-sidebar page__main-sideber">
          <Sidebar/>
        </div>
        <div className="boards-agile-content page__main-content">
          <Header/>

          <article className="boards-agile-dropdown">
            <BADropdown />
          </article>

          <article className="boards-agile-table">
            <BoardsAgileTable />
          </article>

          <BoardsAgileStory />
        </div>
      </div>
    </main>
  );
}

export default BoardsAgile;
