
def run_project(taskmgr, project_id, case_id):
    try:
        # import case model by case id
        exec("from projects.project_1.case_1.run_case import run_case")
        return run_case()
    except Exception, e:
        raise e