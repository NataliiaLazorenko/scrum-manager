import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authOperations } from '../../redux/auth';
import { sprintsOperations, sprintsSelectors } from '../../redux/sprints';
import { tasksOperations, tasksSelectors } from '../../redux/tasks';
import SprintModal from '../../components/SprintModal';
import AddButton from '../../components/AddButton';
import IconButton from '../../components/IconButton';
import SvgComponent from '../../components/SvgComponent';
import Container from '../../components/Container';
import Aside from '../../components/Aside';
import AsideListSprint from '../../components/AsideListSprint';
import SprintTable from '../../components/SprintTable';
import TaskModal from '../../components/TaskModal';
import Diagram from '../../components/Diagram';
import styles from './OneSprintsPage.module.scss';

const OneSprintsPage = () => {
  const [createSprint, setCreateSprint] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [newName, setNewName] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [showDiagram, setShowDiagram] = useState(false);
  const [arrayDate, setArrayDate] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  const { projectId, sprintId } = useParams();
  const { taskId } = useParams(); // undefined

  const sprints = useSelector(sprintsSelectors.getAllSprints);
  const tasks = useSelector(tasksSelectors.getTasks);
  const dispatch = useDispatch();
  // Робимо масив дат з наявних тасків і записуємо початкову дату в state
  // if (tasks.length !== 0) {
  // tasks.map(item => {
  //   if (arrayDate.find(item.startDate)) {
  // return } else { setArrayDate(prevstate => prevstate.push(item.taskDate))
  // });
  // const sortByDate = (a, b) => new Date(a) - new Date(b);
  // const setArrayDate(prevstate => prevstate.sort(sortByDate));
  // setCurrentDate(arrayDate[0].toLocaleDateString());
  // }

  // const increment = (e) => {
  //   e.preventDefault();
  //   setCurrentDate(arrayDate[0 + 1].toLocaleDateString());
  // };

  //  const decrement = e => {
  //    e.preventDefault();
  //    setCurrentDate(arrayDate[0 - 1].toLocaleDateString());
  //  };

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
    dispatch(tasksOperations.fetchTasks(projectId, sprintId));
  }, [dispatch, projectId, sprintId]);

  const tasksFilter = ({ target: { value } }) => {
    dispatch(tasksSelectors.getFilter(value, taskId));
  };

  const currentSprint = sprints.find(({ id }) => id === sprintId);
  // const currentTask = tasks.find(({ id }) => id === sprintId);
  console.log(tasks);

  const onRenameSprint = ({ projectId, sprintId, newName }) =>
    dispatch(sprintsOperations.renameSprint({ projectId, sprintId, newName }));

  const changeInputName = e => {
    setNewName(e.target.value);
  };

  const onSubmitRenameName = e => {
    e.preventDefault();
    onRenameSprint(projectId, sprintId, newName);
    setShowInput(true);
    setShowIcon(true);
  };

  const buttonHandler = () => {
    setCreateSprint(true);
  };

  const buttonHandlerTask = () => {
    setCreateTask(true);
  };

  const buttonHandlerDiagram = () => {
    setShowDiagram(true);
  };

  const btnCloseDiagram = () => {
    setShowDiagram(false);
  };

  const btnCloseSprint = () => {
    setCreateSprint(false);
  };

  const btnCloseTask = () => {
    setCreateTask(false);
  };
  const changeIcon = () => {
    setShowIcon(false);
    setShowInput(false);
  };
  return (
    <>
      <Container classes={styles.container}>
        <div className={styles.sprintsWrapper}>
          <Aside
            createName="Create a sprint"
            showName="Show sprints"
            onClick={buttonHandler}
          >
            <AsideListSprint />
          </Aside>
          <div className={styles.sprintsSideContainer}>
            <div className={styles.formContainer}>
              <div className={styles.pagesContainer}>
                <div className={styles.containerPages}>
                  <IconButton
                    classes={styles.arrowLeftBtn}
                    aria-label="show previous day tasks button"
                    // onClick={decrement}
                  >
                    <SvgComponent
                      name="arrow-left"
                      classes={styles.arrowLeftIcon}
                    />
                  </IconButton>
                  <span className={styles.currentSprintPages}>10</span>
                  <span className={styles.sprintPages}>/12</span>

                  <IconButton
                    classes={styles.arrowRightBtn}
                    aria-label="show next day tasks button"
                    // onClick={increment}
                  >
                    <SvgComponent
                      name="arrow-right"
                      classes={styles.arrowRightIcon}
                    />
                  </IconButton>
                </div>
                {/* <span className={styles.sprintDate}>{currentDate}</span> */}
              </div>
              <form className={styles.searchForm}>
                <IconButton
                  classes={styles.searchBtn}
                  aria-label="search task button"
                  onClick={tasksFilter}
                >
                  <SvgComponent
                    name="search"
                    classes={styles.searchIcon}
                    type="submit"
                  />
                </IconButton>
                <input
                  className={styles.searchSprint}
                  type="search"
                  placeholder="Search task"
                ></input>
              </form>
            </div>
            <div className={styles.sprintNameContainer}>
              <div className={styles.sprintNameEdit}>
                {showInput ? (
                  <h1 className={styles.sprintName}>
                    {newName || currentSprint.name}
                  </h1>
                ) : (
                  <form onSubmit={onSubmitRenameName}>
                    <input
                      value={newName}
                      name="name"
                      id="name"
                      type="name"
                      onChange={changeInputName}
                      className={styles.sprintNameInput}
                    ></input>
                    <IconButton
                      classes={styles.doneBtn}
                      aria-label="confirm changes"
                      type="submit"
                      onSubmit={onSubmitRenameName}
                    >
                      <SvgComponent name="done" classes={styles.doneIcon} />
                    </IconButton>
                  </form>
                )}
                {showIcon && (
                  <>
                    <IconButton
                      classes={styles.projectBtn}
                      aria-label="edit name button"
                      onClick={changeIcon}
                    >
                      <SvgComponent
                        name="project"
                        classes={styles.projectIcon}
                      />
                    </IconButton>
                  </>
                )}
              </div>

              <div className={styles.createNewBtn}>
                <AddButton onClick={buttonHandlerTask} />
                <span className={styles.createTask}>Create a Task</span>
              </div>
            </div>
            <SprintTable />
          </div>
        </div>
        {createSprint && (
          <SprintModal onCloseModal={btnCloseSprint} projectId={sprintId} />
        )}
        {createTask && (
          <TaskModal onCloseModal={btnCloseTask} projectId={taskId} />
        )}
        {showDiagram && <Diagram onCloseModal={btnCloseDiagram} />}
        {/* Кнопка додати проект */}
        <button
          onClick={buttonHandlerTask}
          type="button"
          aria-label="create new element"
          className={styles.addButton}
        >
          <SvgComponent name="create-btn" classes={styles.addIcon} />
        </button>
        {/* Кнопка аналітки */}
        <IconButton
          classes={styles.analyticsBtn}
          aria-label="open diagram button"
          onClick={buttonHandlerDiagram}
        >
          <SvgComponent name="analytics" classes={styles.analyticsIcon} />
        </IconButton>
      </Container>
    </>
  );
};

export default OneSprintsPage;
