<div className={classes.overlay2} name="edit">
  <Button
    onClick={(e) => {
      e.stopPropagation();
      setCurrentId(post._id);
    }}
    style={{ color: 'white' }}
    size="small"
  >
    <MoreHorizIcon fontSize="default" />
  </Button>
</div>;
