<?php $__env->startSection('content'); ?>
<div class="container-fluid app-body">


	<div class="row">
		<div id="app">
			<search-component></search-component>
		</div>
	</div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>