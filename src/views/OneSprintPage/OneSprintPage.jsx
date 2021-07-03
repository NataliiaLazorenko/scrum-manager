import PropTypes from 'prop-types';

import IconButton from '../../components/IconButton';
import SvgComponent from '../../components/SvgComponent';
import styles from './sprint_1.module.scss';

import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import AddButton from '../../components/AddButton';
import styles from './ProjectsPage.module.scss';

import Aside from '../Aside';
// import AsideListProject from '../Components/Aside';
import SprintTable from './SprintCard';

const OneSprintPage = () => {
  return (
    <>
      <Container>
        <div className={styles.sprintsWrapper}>
          <Aside />
          {/* <AsideProjectList /> */}
          <div className={styles.sprintsSideContainer}>
            <div className={styles.formContainer}>
              <div className={styles.pagesContainer}>
                <IconButton
                  classes={styles.arrowLeftBtn}
                  aria-label="show previous day tasks button"
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
                >
                  <SvgComponent
                    name="arrow-right"
                    classes={styles.arrowRightIcon}
                  />
                </IconButton>
                <span className={styles.sprintDate}>08.08.2021</span>
              </div>
              <form className={styles.searchForm}>
                <IconButton
                  classes={styles.searchBtn}
                  aria-label="search task button"
                >
                  <SvgComponent
                    name="search"
                    classes={styles.searchIcon}
                    type="submit"
                  />
                </IconButton>
                <input className={styles.searchSprint} type="search"></input>
              </form>
            </div>
            <div className={styles.sprintNameContainer}>
              <h1 className={styles.sprintName}>Sprint Burndown Chart 1</h1>
              <IconButton
                classes={styles.projectBtn}
                aria-label="edit name button"
              >
                <SvgComponent name="project" classes={styles.projectIcon} />
              </IconButton>
              <div className={styles.createNewBtn}>
                <AddButton />
                <span className={styles.createTask}>Create a Task</span>
              </div>
            </div>
            <SprintTable />
            <button
              type="button"
              aria-label="create new element"
              className={styles.addButton}
            >
              <SvgComponent name="create-btn" classes={styles.addIcon} />
            </button>
            <IconButton
              classes={styles.analyticsBtn}
              aria-label="open diagram button"
            >
              <SvgComponent name="analytics" classes={styles.analyticsIcon} />
            </IconButton>
          </div>
        </div>
      </Container>
    </>
  );
};
export default OneSprintPage;
